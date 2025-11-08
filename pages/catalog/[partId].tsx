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

function CatalogPartPage({
  query,
  metaTitle,
  metaDescription,
  jsonLd,
}: {
  query: IQueryParams
  metaTitle: string
  metaDescription: string
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
        <meta name="keywords" content="купить авто, автомобили, продажа авто, автопригон, канадские автомобили, авто из США, авто из Кореи" />
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

    const images = data.images && data.images !== '[]' && data.images !== 'null'
      ? JSON.parse(data.images)
      : []
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://auto-c-cars.ru'
    const productUrl = `${baseUrl}/catalog/${data.id}`

    // JSON-LD структурированные данные для товара
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": data.name,
      "description": data.description || `Купить ${data.name} по отличной цене`,
      "image": images.length > 0 ? images : [`${baseUrl}/img/logo.png`],
      "brand": {
        "@type": "Brand",
        "name": data.brand || data.boiler_manufacturer
      },
      "sku": data.id.toString(),
      "offers": {
        "@type": "Offer",
        "url": productUrl,
        "priceCurrency": "RUB",
        "price": data.price || 0,
        "availability": data.sale || data.in_stock === 0 
          ? "https://schema.org/Discontinued" 
          : "https://schema.org/InStock",
        "itemCondition": "https://schema.org/UsedCondition"
      },
      "vehicleIdentificationNumber": data.vin || undefined,
      "productionDate": data.year || data.Year || undefined,
      "mileageFromOdometer": {
        "@type": "QuantitativeValue",
        "value": data.mileage || data.Mileage || undefined,
        "unitCode": "KMT"
      }
    }

    return {
      props: {
        query,
        metaTitle: `Auto-c – ${data.name}`,
        metaDescription: `Купить ${data.name} по отличной цене. Подробности, характеристики и условия доставки на сайте Auto-c.`,
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
