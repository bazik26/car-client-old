/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://auto-c-cars.ru',
  generateRobotsTxt: false, // Мы уже создали свой robots.txt
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: [
    '/admin',
    '/admin/*',
    '/api/*',
    '/_next/*',
    '/*/cart',
    '/*/order'
  ],
  transform: async (config, path) => {
    // Кастомные приоритеты для разных страниц
    let priority = config.priority
    let changefreq = config.changefreq

    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    } else if (path.startsWith('/catalog/')) {
      priority = 0.8
      changefreq = 'weekly'
    } else if (path === '/catalog') {
      priority = 0.9
      changefreq = 'daily'
    } else if (path === '/about' || path === '/contacts') {
      priority = 0.6
      changefreq = 'monthly'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      // Добавляем альтернативные языки (если планируете мультиязычность)
      alternateRefs: [],
    }
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/_next/'],
      },
      {
        userAgent: 'Yandex',
        allow: '/',
        disallow: ['/admin', '/api/'],
        crawlDelay: 0.5,
      },
    ],
    additionalSitemaps: [
      'https://auto-c-cars.ru/server-sitemap.xml',
    ],
  },
}
