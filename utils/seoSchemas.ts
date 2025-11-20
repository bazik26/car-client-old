import { IBoilerPart } from '@/types/boilerparts'

const SITE_URL = 'https://auto-c-cars.ru'
const SITE_NAME = 'Auto-c Cars'

/**
 * Генерирует Schema.org разметку для автомобиля (Product + Car)
 */
export function generateCarSchema(car: IBoilerPart) {
  const images = car.images ? 
    (typeof car.images === 'string' ? JSON.parse(car.images) : car.images) : []
  
  const firstImage = Array.isArray(images) && images.length > 0 ? images[0] : `${SITE_URL}/img/logo.png`

  return {
    '@context': 'https://schema.org',
    '@type': ['Product', 'Car'],
    name: car.name || `${car.brand} ${car.Model}`,
    description: car.description || `${car.brand} ${car.Model} ${car.Year} года`,
    image: firstImage,
    brand: {
      '@type': 'Brand',
      name: car.boiler_manufacturer || car.brand,
    },
    sku: car.vendor_code || `CAR-${car.id}`,
    mpn: car.vendor_code,
    vehicleIdentificationNumber: car.vendor_code,
    
    // Информация о продукте
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/catalog/${car.id}`,
      priceCurrency: 'RUB',
      price: car.price || 0,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +30 дней
      availability: car.sale 
        ? 'https://schema.org/SoldOut' 
        : car.in_stock 
          ? 'https://schema.org/InStock' 
          : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/UsedCondition',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
    
    // Характеристики автомобиля
    vehicleModelDate: car.Year,
    productionDate: car.Year,
    model: car.Model,
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: car.Mileage ? parseFloat(car.Mileage) : undefined,
      unitCode: 'KMT', // километры
    },
    fuelType: car.fuel,
    driveWheelConfiguration: car.Drive,
    vehicleTransmission: car.Transmission,
    vehicleEngine: {
      '@type': 'EngineSpecification',
      engineDisplacement: {
        '@type': 'QuantitativeValue',
        value: car.Engine ? parseFloat(car.Engine) : undefined,
        unitCode: 'LTR', // литры
      },
    },
    
    // Рейтинг (если есть)
    ...(car.popularity && car.popularity > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: 4.5,
        reviewCount: Math.floor(car.popularity / 10) || 1,
      },
    }),
  }
}

/**
 * Генерирует хлебные крошки для SEO
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}

/**
 * Генерирует разметку для списка автомобилей
 */
export function generateItemListSchema(cars: IBoilerPart[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: cars.map((car, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/catalog/${car.id}`,
      name: car.name || `${car.brand} ${car.Model}`,
    })),
  }
}

/**
 * Генерирует разметку для страницы "О компании"
 */
export function generateAboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'О компании Auto-c Cars',
    description: 'Компания Auto-c Cars занимается продажей качественных автомобилей из Европы, США, Канады и Кореи',
    url: `${SITE_URL}/about`,
  }
}

/**
 * Генерирует разметку для страницы контактов
 */
export function generateContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Контакты Auto-c Cars',
    description: 'Свяжитесь с нами для покупки автомобиля',
    url: `${SITE_URL}/contacts`,
  }
}

/**
 * Генерирует разметку местоположения (Мурманск - главный офис)
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: SITE_NAME,
    image: `${SITE_URL}/img/logo.png`,
    '@id': SITE_URL,
    url: SITE_URL,
    email: 'auto-c-cars@yandex.ru',
    telephone: '+7-985-263-41-64',
    priceRange: '₽₽₽',
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
    geo: [
      {
        '@type': 'GeoCoordinates',
        latitude: 68.9585,
        longitude: 33.0827,
      },
      {
        '@type': 'GeoCoordinates',
        latitude: 56.8389,
        longitude: 60.6057,
      },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: [],
  }
}

