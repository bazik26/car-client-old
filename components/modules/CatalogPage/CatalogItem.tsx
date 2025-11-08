/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import Link from 'next/link'
import { $mode } from '@/context/mode'
import { IBoilerPart } from '@/types/boilerparts'
import { formatPrice } from '@/utils/common'
import styles from '@/styles/catalog/index.module.scss'
import CarImage from '@/components/elements/CarImage/CarImage'

const CatalogItem = ({ item }: { item: IBoilerPart }) => {
  const mode = useStore($mode)
  // const user = useStore($user)
  // const shoppingCart = useStore($shoppingCart)
  // const isInCart = shoppingCart.some((cartItem) => cartItem.partId === item.id)
  // const spinner = useStore(removeFromCartFx.pending)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  // Debug: проверим, какие данные приходят
  console.log('CatalogItem data:', item)
  console.log('Item year:', item.year, 'Item Year:', item.Year)
  console.log('Item mileage:', item.mileage, 'Item Mileage:', item.Mileage)
  console.log('Item description:', item.description)

  // const toggleToCart = () => toggleCartItem(user.username, item.id, isInCart)

  const images = item.images && item.images !== '[]' && item.images !== 'null'
    ? JSON.parse(item.images)
    : []
  const mainImage = images[0] || undefined
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://auto-c-cars.ru'
  const productUrl = `${baseUrl}/catalog/${item.id}`

  return (
    <article
      itemScope
      itemType="https://schema.org/Product"
      className={`${styles.catalog__list__item} ${darkModeClass}`}
    >
      <Link href={`/catalog/${item.id}`} target="_blank" passHref legacyBehavior>
        <a
          target="_blank"
          className={styles.catalog__list__item__link}
          itemProp="url"
        >
          <div className={styles.catalog__list__item__imghold}>
            <CarImage
              src={mainImage}
              alt={item.name}
              className={styles.catalog__list__item__img}
              itemProp="image"
              loading="lazy"
            />
          </div>
          <div className={styles.catalog__list__item__inner}>
            <h3 className={styles.catalog__list__item__title} itemProp="name">
              {item.name}
            </h3>

            {/* Основная информация */}
            <div className={styles.catalog__list__item__main_info}>
              {(item.year || item.Year) && (
                <h4 className={styles.catalog__list__item__info}>
                  <span>Год: </span>
                  <span itemProp="productionDate">{item.year || item.Year}</span>
                </h4>
              )}
              {(item.mileage || item.Mileage) && (
                <h4 className={styles.catalog__list__item__info}>
                  <span>Пробег: </span>
                  <span itemProp="mileageFromOdometer">
                    {(item.mileage || item.Mileage).toLocaleString()} км
                  </span>
                </h4>
              )}
              {item.Engine && (
                <h4 className={styles.catalog__list__item__info}>
                  <span>Двигатель: </span>
                  <span itemProp="vehicleEngine">{item.Engine} л</span>
                </h4>
              )}
              {item.fuel && (
                <h4 className={styles.catalog__list__item__info}>
                  <span>Топливо: </span>
                  <span itemProp="fuelType">{item.fuel}</span>
                </h4>
              )}
            </div>

            {/* Статус и цена */}
            <div className={styles.catalog__list__item__footer}>
              <span className={styles.catalog__list__item__stock}>
                {item.sale ? (
                  <span className={styles.catalog__list__item__stock__sold}>
                    ПРОДАНО
                  </span>
                ) : item.in_stock > 0 ? (
                  <span className={styles.catalog__list__item__stock__success}>
                    В наличии
                  </span>
                ) : (
                  <span className={styles.catalog__list__item__stock__not}>
                    Нет в наличии
                  </span>
                )}
              </span>
              {!item.sale && (
                <span
                  itemScope
                  itemType="https://schema.org/Offer"
                  className={styles.catalog__list__item__price}
                >
                  <meta itemProp="priceCurrency" content="RUB" />
                  <meta itemProp="price" content={item.price.toString()} />
                  <meta itemProp="availability" content={item.in_stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"} />
                  <span itemProp="price" content={item.price.toString()}>
                    {formatPrice(item.price)} ₽
                  </span>
                </span>
              )}
            </div>
          </div>
        </a>
      </Link>
      {/* Hidden structured data */}
      <meta itemProp="brand" content={item.brand || item.boiler_manufacturer} />
      <meta itemProp="model" content={item.model || item.Model} />
      {item.description && (
        <meta itemProp="description" content={item.description} />
      )}
    </article>
  )
}

export default CatalogItem
