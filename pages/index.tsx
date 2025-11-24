/* eslint-disable max-len */

import Head from 'next/head'
import Layout from '@/components/layout/Layout'
import DashboardPage from '@/components/templates/DashboardPage/DashboardPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'

function Dashboard() {
  const { shouldLoadContent } = useRedirectByUserCheck()

  return (
    <>
      <Head>
        <title>Auto-c – авто из Европы, США и Кореи под заказ</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://auto-c-cars.ru/" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/logo.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Auto-c" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Основные SEO мета-теги */}
        <meta
          name="description"
          content="Импорт автомобилей из Европы, США и Кореи в Россию под ключ. Подбор, проверка, доставка, растаможка и оформление. Только проверенные авто. Гарантия юридической чистоты."
        />
        <meta name="keywords" content="авто из Европы, авто из США, авто из Кореи, купить авто, автомобили, продажа авто, автопригон, канадские автомобили, импорт авто" />
        <meta name="author" content="Auto-c" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Russian" />
        <meta name="geo.region" content="RU" />
        
        {/* Yandex Webmaster мета-теги */}
        <meta name="yandex-verification" content="" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Auto-c – авто из Европы, США и Кореи под заказ" />
        <meta property="og:description" content="Импорт автомобилей из Европы, США и Кореи в Россию под ключ. Подбор, проверка, доставка, растаможка и оформление." />
        <meta property="og:image" content="https://auto-c-cars.ru/img/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://auto-c-cars.ru/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Auto-c" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Auto-c – авто из Европы, США и Кореи под заказ" />
        <meta name="twitter:description" content="Импорт автомобилей из Европы, США и Кореи в Россию под ключ." />
        <meta name="twitter:image" content="https://auto-c-cars.ru/img/logo.png" />
        
        {/* Schema.org JSON-LD для главной страницы */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Auto-c",
              "description": "Импорт автомобилей из Европы, США и Кореи в Россию под ключ",
              "url": "https://auto-c-cars.ru/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://auto-c-cars.ru/catalog?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Auto-c",
              "url": "https://auto-c-cars.ru/",
              "logo": "https://auto-c-cars.ru/img/logo.png",
              "description": "Импорт автомобилей из Европы, США и Кореи в Россию под ключ"
            })
          }}
        />
      </Head>
      {shouldLoadContent && (
        <Layout>
          <main>
            <DashboardPage />
            <div className="overlay" />
          </main>
        </Layout>
      )}
    </>
  )
}

export default Dashboard
