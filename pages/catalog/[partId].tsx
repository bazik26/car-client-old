import Head from 'next/head'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useCallback, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import Layout from '@/components/layout/Layout'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { IQueryParams } from '@/types/catalog'
import { $boilerPart, setBoilerPart } from '@/context/boilerPart'
import { getBoilerPartFx } from '@/app/api/boilerParts'
import PartPage from '@/components/templates/PartPage/PartPage'
import Custom404 from '../404'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { GetServerSideProps } from 'next'
import { normalizeImages, safeNumber } from '@/utils/common'

function CatalogPartPage({
  query,
  metaTitle,
  metaDescription,
  metaKeywords,
  jsonLd,
}: {
  query: IQueryParams
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  jsonLd?: string
}) {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const boilerPart = useStore($boilerPart)
  const [error, setError] = useState(false)
  const router = useRouter()
  const getDefaultTextGenerator = useCallback(
    (subpath: string) => subpath.replace('catalog', 'Каталог'),
    []
  )
  const getTextGenerator = useCallback((param: string) => ({}[param]), [])
  const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

  useEffect(() => {
    loadBoilerPart()
  }, [router.asPath])

  useEffect(() => {
    if (lastCrumb) {
      lastCrumb.textContent = boilerPart.name
    }
  }, [lastCrumb, boilerPart])

  const loadBoilerPart = async () => {
    try {
      const data = await getBoilerPartFx(`/cars/car/${query.partId}`)

      if (!data) {
        setError(true)
        return
      }

      setBoilerPart(data)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`https://auto-c-cars.ru/catalog/${query.partId}`} />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/logo.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Auto-c" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Основные SEO мета-теги */}
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta name="author" content="Auto-c" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Russian" />
        <meta name="geo.region" content="RU" />
        
        {/* Yandex Webmaster мета-теги */}
        <meta name="yandex-verification" content="" />
        
        {/* Open Graph */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content="https://auto-c-cars.ru/img/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={`https://auto-c-cars.ru/catalog/${query.partId}`} />
        <meta property="og:type" content="product" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Auto-c" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content="https://auto-c-cars.ru/img/logo.png" />
        
        {/* Schema.org JSON-LD для товара */}
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: jsonLd
            }}
          />
        )}
      </Head>
      {error ? (
        <Custom404 />
      ) : (
        shouldLoadContent && (
          <Layout>
            <main>
              <Breadcrumbs
                getDefaultTextGenerator={getDefaultTextGenerator}
                getTextGenerator={getTextGenerator}
              />
              <PartPage />
              <div className="overlay" />
            </main>
          </Layout>
        )
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query as unknown as IQueryParams

  try {
    const data = await getBoilerPartFx(`/cars/car/${query.partId}`)

    if (!data) {
      return {
        notFound: true,
      }
    }

    const images = normalizeImages(data.images)
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://auto-c-cars.ru'
    const productUrl = `${baseUrl}/catalog/${data.id}`
    const priceValue = safeNumber(data.price)
    const mileageValue = safeNumber(data.mileage ?? data.Mileage, NaN)
    const mileageFromOdometer = Number.isFinite(mileageValue) ? mileageValue : undefined
    const productionYear = data.year ?? data.Year ?? undefined
    const vin = data.vin || data.vendor_code || undefined
    const brandName = data.brand || data.boiler_manufacturer || undefined
    const availability =
      data.sale || data.in_stock === 0
        ? 'https://schema.org/Discontinued'
        : 'https://schema.org/InStock'

    // JSON-LD структурированные данные для товара
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": data.name || 'Автомобиль',
      "description": data.description || (data.name ? `Купить ${data.name} по отличной цене` : 'Купить автомобиль по отличной цене'),
      "image": images.length > 0 ? images : [`${baseUrl}/img/logo.png`],
      "brand": {
        "@type": "Brand",
        "name": brandName
      },
      "sku": data.id.toString(),
      "offers": {
        "@type": "Offer",
        "url": productUrl,
        "priceCurrency": "RUB",
        "price": priceValue,
        "availability": availability,
        "itemCondition": "https://schema.org/UsedCondition"
      },
      "vehicleIdentificationNumber": vin,
      "productionDate": productionYear,
      "mileageFromOdometer": {
        "@type": "QuantitativeValue",
        "value": mileageFromOdometer,
        "unitCode": "KMT"
      }
    }

    // Формируем богатое SEO описание с переменными
    const specs = []
    if (productionYear) specs.push(`${productionYear} г.`)
    if (mileageFromOdometer) specs.push(`пробег ${Math.round(mileageFromOdometer).toLocaleString('ru-RU')} км`)
    if (data.Engine || data.engine) specs.push(`двигатель ${data.Engine || data.engine}л`)
    if (data.fuel) specs.push(data.fuel.toLowerCase())
    if (data.Transmission || data.gearbox) specs.push((data.Transmission || data.gearbox).toLowerCase())
    if (data.Drive || data.drive) specs.push((data.Drive || data.drive).toLowerCase())
    if (priceValue) specs.push(`${priceValue.toLocaleString('ru-RU')} руб`)
    
    const specsText = specs.length > 0 ? ` ${specs.join(', ')}` : ''
    const statusText = (data.sale || data.in_stock === 0) ? ' [ПРОДАНО]' : ' в наличии'
    
    const richMetaDescription = `${data.name}${specsText}${statusText}. Купить автомобиль из Европы под ключ с доставкой в РФ. Проверенное авто с документами. Консультация и помощь в оформлении. Auto-c-cars.ru`

    // Формируем уникальные keywords для каждой машины
    const keywordParts = [
      'купить',
      data.brand || brandName,
      data.Model,
      productionYear,
      'автомобиль',
      'авто из Европы',
      data.fuel,
      data.Transmission || data.gearbox,
      data.Drive || data.drive,
      'автопригон',
      'пригон авто',
      'авто под ключ',
      'проверенное авто',
      data.brand ? `${data.brand} с пробегом` : null,
      mileageFromOdometer ? `пробег ${Math.round(mileageFromOdometer)} км` : null,
      (data.sale || data.in_stock === 0) ? 'продано' : 'в наличии',
      'доставка авто',
      'растаможка авто'
    ].filter(Boolean)
    
    const metaKeywords = keywordParts.join(', ')

    return {
      props: {
        query,
        metaTitle: `${data.name}${productionYear ? ` ${productionYear} г.` : ''}${mileageFromOdometer ? ` • ${Math.round(mileageFromOdometer).toLocaleString('ru-RU')} км` : ''} – Auto-c`,
        metaDescription: richMetaDescription,
        metaKeywords: metaKeywords,
        jsonLd: JSON.stringify(jsonLd),
      },
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}

export default CatalogPartPage
