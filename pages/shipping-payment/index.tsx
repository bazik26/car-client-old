import Head from 'next/head'
import Layout from '@/components/layout/Layout'
import ShippingPayment from '@/components/templates/ShippingPayment/ShippingPayment'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { useCallback } from 'react'
import { GetServerSideProps } from 'next'

function ShippingPaymentPage({
  metaTitle,
  metaDescription,
}: {
  metaTitle: string
  metaDescription: string
}) {
  const getDefaultTextGenerator = useCallback(() => 'Доставка и оплата', [])
  const getTextGenerator = useCallback((param: string) => ({}[param]), [])

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://importeurocar.ru/" />

        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/img/logo.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Import Euro Car" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* SEO Meta Tags */}
        <meta name="description" content={metaDescription} />
        <meta
          name="keywords"
          content="авто из Европы, купить авто, автомобили, продажа авто, автопригон"
        />
        <meta name="author" content="Import Euro Car" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta
          property="og:image"
          content="https://importeurocar.ru/img/logo.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://importeurocar.ru/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru_RU" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta
          name="twitter:image"
          content="https://importeurocar.ru/img/logo.png"
        />
      </Head>
      <Layout>
        <main>
          <Breadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
          />
          <ShippingPayment />
          <div className="overlay" />
        </main>
      </Layout>
    </>
  )
}

export default ShippingPaymentPage

// 🚀 Теперь страница будет рендериться на сервере (SSR)
export const getServerSideProps: GetServerSideProps = async () => {
  console.log('🔍 getServerSideProps вызван на сервере!')
  return {
    props: {
      metaTitle: 'Import Euro Car – Доставка и оплата',
      metaDescription:
        'Узнайте о вариантах доставки и способах оплаты при покупке автомобилей из Европы на Import Euro Car. Подробная информация о процессе покупки, условиях транспортировки и доступных методах оплаты.',
    },
  }
}
