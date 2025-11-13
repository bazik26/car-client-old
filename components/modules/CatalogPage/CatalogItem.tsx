/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import Link from 'next/link'
import { $mode } from '@/context/mode'
import { IBoilerPart } from '@/types/boilerparts'
import { formatPrice, normalizeImages, safeNumber } from '@/utils/common'
import styles from '@/styles/catalog/index.module.scss'
import CarImage from '@/components/elements/CarImage/CarImage'

const CatalogItem = ({ item }: { item: IBoilerPart }) => {
  const mode = useStore($mode)
  // const user = useStore($user)
  // const shoppingCart = useStore($shoppingCart)
  // const isInCart = shoppingCart.some((cartItem) => cartItem.partId === item.id)
  // const spinner = useStore(removeFromCartFx.pending)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  // const toggleToCart = () => toggleCartItem(user.username, item.id, isInCart)

  const images = normalizeImages(item.images)
  const mainImage = images[0]
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://auto-c-cars.ru'
  const productUrl = `${baseUrl}/catalog/${item.id}`
  const displayName = item.name || (typeof item.title === 'string' ? item.title : 'Автомобиль')
  const yearValue = item.year ?? item.Year ?? ''
  const mileageRaw = item.mileage ?? item.Mileage
  const mileageValue = safeNumber(mileageRaw, NaN)
  const mileageText = Number.isFinite(mileageValue)
    ? mileageValue.toLocaleString('ru-RU')
    : typeof mileageRaw === 'string'
      ? mileageRaw
      : ''
  const engineText = item.Engine || ''
  const priceValue = safeNumber(item.price)


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
          <div className={styles.catalog__list__item__imghold} itemProp="image">
            <CarImage
              src={mainImage}
              alt={item.name}
              className={styles.catalog__list__item__img}
            />
          </div>
          <div className={styles.catalog__list__item__inner}>
            <h3 className={styles.catalog__list__item__title} itemProp="name">
              {displayName}
            </h3>

            {/* Основная информация */}
            <div className={styles.catalog__list__item__main_info}>
              {yearValue && (
                <h4 className={styles.catalog__list__item__info}>
                  <span>Год: </span>
                  <span itemProp="productionDate">{yearValue}</span>
                </h4>
              )}
              {mileageText && (
                <h4 className={styles.catalog__list__item__info}>
                  <span>Пробег: </span>
                  <span itemProp="mileageFromOdometer">
                    {mileageText} км
                  </span>
                </h4>
              )}
              {engineText && (
                <h4 className={styles.catalog__list__item__info}>
                  <span>Двигатель: </span>
                  <span itemProp="vehicleEngine">{engineText} л</span>
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
                  <meta itemProp="price" content={priceValue.toString()} />
                  <meta itemProp="availability" content={item.in_stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"} />
                  <span>
                    {formatPrice(priceValue)} ₽
                  </span>
                </span>
              )}
            </div>
          </div>
        </a>
      </Link>
      {/* Hidden structured data */}
      <meta itemProp="brand" content={item.brand || item.boiler_manufacturer} />
      <meta itemProp="model" content={item.Model || ''} />
      {item.description && (
        <meta itemProp="description" content={item.description} />
      )}
    </article>
  )
}

export default CatalogItem
