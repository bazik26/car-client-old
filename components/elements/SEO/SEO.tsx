import Head from 'next/head'

export interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'product' | 'article'
  keywords?: string
  noindex?: boolean
  jsonLd?: any // Структурированные данные Schema.org
}

const DEFAULT_KEYWORDS = 'авто из Европы, купить авто, автомобили, продажа авто, автопригон, канадские автомобили, авто из США, авто из Кореи, купить машину, продажа автомобилей'
const SITE_NAME = 'Auto-c Cars'
const SITE_URL = 'https://auto-c-cars.ru'
const DEFAULT_IMAGE = 'https://auto-c-cars.ru/img/logo.png'

export default function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  keywords = DEFAULT_KEYWORDS,
  noindex = false,
  jsonLd,
}: SEOProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const canonicalUrl = canonical || SITE_URL

  return (
    <Head>
      {/* Основные мета-теги */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="googlebot" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="yandex" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="ru_RU" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Дополнительные мета-теги */}
      <meta name="author" content={SITE_NAME} />
      <meta name="language" content="Russian" />
      <meta name="geo.region" content="RU-MUR" />
      <meta name="geo.placename" content="Мурманск, Екатеринбург" />
      <meta name="contact" content="auto-c-cars@yandex.ru" />
      <meta name="reply-to" content="auto-c-cars@yandex.ru" />
      
      {/* Фавиконки */}
      <link rel="icon" type="image/png" sizes="32x32" href="/img/logo.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Структурированные данные JSON-LD */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      )}
      
      {/* Базовая организация для всех страниц */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
            logo: DEFAULT_IMAGE,
            email: 'auto-c-cars@yandex.ru',
            telephone: '+7-985-263-41-64',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+7-985-263-41-64',
              contactType: 'customer service',
              areaServed: 'RU',
              availableLanguage: ['Russian'],
              email: 'auto-c-cars@yandex.ru',
            },
            address: [
              {
                '@type': 'PostalAddress',
                streetAddress: 'ул. Академика Книповича, д. 23, офис 119',
                addressLocality: 'Мурманск',
                addressRegion: 'Мурманская область',
                postalCode: '183039',
                addressCountry: 'RU',
              },
              {
                '@type': 'PostalAddress',
                streetAddress: 'ул. Белинского, д. 83, офис 416',
                addressLocality: 'Екатеринбург',
                addressRegion: 'Свердловская область',
                postalCode: '620026',
                addressCountry: 'RU',
              },
            ],
            sameAs: [],
          }),
        }}
      />
    </Head>
  )
}

