/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import Link from 'next/link'
import { $mode } from '@/context/mode'
import { IBoilerPart } from '@/types/boilerparts'
import { formatPrice } from '@/utils/common'
import styles from '@/styles/catalog/index.module.scss'

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

  return (
    <Link href={`/catalog/${item.id}`} target="_blank" passHref legacyBehavior>
      <a
        target="_blank"
        className={`${styles.catalog__list__item} ${darkModeClass}`}
      >
        <div className={styles.catalog__list__item__imghold}>
          <img 
            src={
              item.images && item.images !== '[]' && item.images !== 'null'
                ? JSON.parse(item.images)[0]
                : '/img/placeholder.png'
            } 
            alt={item.name} 
          />
        </div>
        <div className={styles.catalog__list__item__inner}>
          <h3 className={styles.catalog__list__item__title}>{item.name}</h3>

          {/* Основная информация */}
          <div className={styles.catalog__list__item__main_info}>
            {(item.year || item.Year) && (
              <h4 className={styles.catalog__list__item__info}>
                <span>Год: </span>
                {item.year || item.Year}
              </h4>
            )}
            {(item.mileage || item.Mileage) && (
              <h4 className={styles.catalog__list__item__info}>
                <span>Пробег: </span>
                {(item.mileage || item.Mileage).toLocaleString()} км
              </h4>
            )}
            {(item.engine || item.Engine) && (
              <h4 className={styles.catalog__list__item__info}>
                <span>Двигатель: </span>
                {item.engine || item.Engine} л
              </h4>
            )}
            {item.fuel && (
              <h4 className={styles.catalog__list__item__info}>
                <span>Топливо: </span>
                {item.fuel}
              </h4>
            )}
          </div>

          {/* Дополнительная информация */}
          <div className={styles.catalog__list__item__additional_info}>
            {(item.gearbox || item.Transmission) && (
              <h4 className={styles.catalog__list__item__info}>
                <span>КПП: </span>
                {item.gearbox || item.Transmission}
              </h4>
            )}
            {(item.drive || item.Drive) && (
              <h4 className={styles.catalog__list__item__info}>
                <span>Привод: </span>
                {item.drive || item.Drive}
              </h4>
            )}
            {item.powerValue && (
              <h4 className={styles.catalog__list__item__info}>
                <span>Мощность: </span>
                {item.powerValue} {item.powerType}
              </h4>
            )}
          </div>

          {/* Описание */}
          {item.description && (
            <div className={styles.catalog__list__item__description}>
              <p>
                {item.description.length > 100
                  ? `${item.description.substring(0, 100)}...`
                  : item.description}
              </p>
            </div>
          )}

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
            <span className={styles.catalog__list__item__price}>
              {formatPrice(item.price)} ₽
            </span>
          </div>
        </div>
        {/* <button
          className={`${styles.catalog__list__item__cart} ${
            isInCart ? styles.added : ''
          }`}
          disabled={spinner}
          onClick={toggleToCart}
        >
          {spinner ? (
            <div className={spinnerStyles.spinner} style={{ top: 6, left: 6 }} />
          ) : (
            <span>{isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}</span>
          )}
        </button> */}
      </a>
    </Link>
  )
}

export default CatalogItem
