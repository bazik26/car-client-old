# SEO Оптимизация shop-ytb-client для Яндекса

## ✅ Выполненные оптимизации

### 1. Яндекс.Метрика ✅
- Добавлен код Яндекс.Метрики в `_document.tsx`
- **ВАЖНО:** Замените `98765432` на ваш реальный ID счетчика
- Настроена электронная коммерция (`ecommerce`)
- Включены: кликмапы, вебвизор, отслеживание ссылок

### 2. Яндекс.Вебмастер ✅
- Добавлен мета-тег верификации
- **ВАЖНО:** Получите код верификации и замените `YOUR_YANDEX_VERIFICATION_CODE` в `SEO.tsx`
- Инструкция: https://webmaster.yandex.ru/

### 3. Robots.txt ✅
- Обновлен с правильным доменом `auto-c-cars.ru`
- Добавлены правила для Яндекса с `Crawl-delay: 0.5`
- Указаны sitemap URL

### 4. Schema.org Микроразметка ✅
- **Product + Car schema** - для страниц автомобилей
- **Organization schema** - информация о компании
- **LocalBusiness schema** - 2 офиса (Мурманск и Екатеринбург)
- **BreadcrumbList** - хлебные крошки
- **ItemList** - списки товаров

### 5. SEO Компонент ✅
Создан универсальный компонент `<SEO />` с:
- Open Graph тегами
- Twitter Card
- Canonical URL
- Meta description, keywords
- Структурированными данными

### 6. Sitemap ✅
- Настроены приоритеты страниц
- Главная: 1.0
- Каталог: 0.9
- Товары: 0.8
- Другие: 0.6-0.7

## 📋 Что нужно сделать вручную

### 1. Получить ID Яндекс.Метрики
1. Зайдите на https://metrika.yandex.ru
2. Создайте счетчик для `auto-c-cars.ru`
3. Замените `98765432` в `pages/_document.tsx` на ваш ID

### 2. Верифицировать сайт в Яндекс.Вебмастере
1. Зайдите на https://webmaster.yandex.ru
2. Добавьте сайт `https://auto-c-cars.ru`
3. Получите мета-тег верификации
4. Замените `YOUR_YANDEX_VERIFICATION_CODE` в `components/elements/SEO/SEO.tsx`

### 3. Настроить Google Search Console (опционально)
1. Зайдите на https://search.google.com/search-console
2. Добавьте домен
3. Верифицируйте через DNS или файл

### 4. Отправить sitemap
После деплоя отправьте sitemap в Яндекс.Вебмастер:
- `https://auto-c-cars.ru/sitemap.xml`
- `https://auto-c-cars.ru/server-sitemap.xml`

### 5. Использование SEO компонента в страницах

Замените стандартные `<Head>` теги на компонент `<SEO />`:

```tsx
import SEO from '@/components/elements/SEO/SEO'
import { generateCarSchema } from '@/utils/seoSchemas'

function ProductPage({ car }) {
  const carSchema = generateCarSchema(car)
  
  return (
    <>
      <SEO
        title={`${car.brand} ${car.model} ${car.year}`}
        description={`Купить ${car.brand} ${car.model} ${car.year} года. ${car.description}`}
        canonical={`https://auto-c-cars.ru/catalog/${car.id}`}
        ogImage={car.images[0]}
        ogType="product"
        keywords="купить авто, автомобили, продажа авто"
        jsonLd={carSchema}
      />
      {/* Ваш контент */}
    </>
  )
}
```

## 📊 Проверка SEO

### Инструменты для проверки:
1. **Яндекс.Вебмастер** - основной инструмент
   - Индексация
   - Региональность
   - Качество сайта
   - Структурированные данные

2. **Проверка микроразметки:**
   - https://validator.schema.org
   - https://webmaster.yandex.ru/tools/microtest/

3. **PageSpeed Insights:**
   - https://pagespeed.web.dev

4. **Robots.txt валидатор:**
   - https://webmaster.yandex.ru/tools/robotstxt/

## 🎯 Ключевые моменты для Яндекса

### ✅ Сделано:
- Региональность (Мурманск, Екатеринбург)
- Контактная информация
- График работы
- Телефон и email
- Правильные заголовки H1-H6
- Alt-теги для изображений
- Быстрая загрузка страниц

### 📝 Рекомендации:
1. Регулярно обновляйте контент
2. Следите за скоростью загрузки
3. Оптимизируйте изображения (WebP)
4. Добавьте отзывы клиентов
5. Создайте блог с полезными статьями
6. Добавьте SSL сертификат (HTTPS)

## 📱 Мобильная оптимизация
- Viewport настроен
- Адаптивный дизайн
- Touch-friendly элементы
- Быстрая загрузка на 3G/4G

## 🔗 Полезные ссылки
- [Яндекс.Вебмастер](https://webmaster.yandex.ru)
- [Яндекс.Метрика](https://metrika.yandex.ru)
- [Schema.org](https://schema.org)
- [Рекомендации Яндекса](https://yandex.ru/support/webmaster/)

## 📞 Контакты в разметке
✅ Мурманск: ул. Академика Книповича, д. 23, офис 119
✅ Екатеринбург: ул. Белинского, д. 83, офис 416
✅ Телефон: +7 (985) 263-41-64
✅ Email: auto-c-cars@yandex.ru
✅ График: 09:00 - 18:00 (Пн-Пт)

