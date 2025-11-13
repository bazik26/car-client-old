import { useStore } from 'effector-react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { $boilerPart } from '@/context/boilerPart'
import { $mode } from '@/context/mode'
import PartImagesList from '@/components/modules/PartPage/PartImagesList'
import { formatPrice, normalizeImages, safeNumber } from '@/utils/common'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import PartTabs from '@/components/modules/PartPage/PartTabs'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import { getBoilerPartsFx } from '@/app/api/boilerParts'
import {
  $boilerParts,
  setBoilerParts,
  setBoilerPartsByPopularity,
} from '@/context/boilerParts'
import PartAccordion from '@/components/modules/PartPage/PartAccordion'
import styles from '@/styles/part/index.module.scss'

const PartPage = () => {
  const mode = useStore($mode)
  // const user = useStore($user)
  const isMobile = useMediaQuery(850)
  const boilerPart = useStore($boilerPart)
  const boilerParts = useStore($boilerParts)
  // const cartItems = useStore($shoppingCart)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  // const isInCart = cartItems.some((item) => item.partId === boilerPart.id)
  // const spinnerToggleCart = useStore(removeFromCartFx.pending)
  const spinnerSlider = useStore(getBoilerPartsFx.pending)

  useEffect(() => {
    loadBoilerPart()
  }, [])

  const loadBoilerPart = async () => {
    try {
      const data = await getBoilerPartsFx('/cars?limit=20&offset=0')

      setBoilerParts(data)
      setBoilerPartsByPopularity()
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  // const toggleToCart = () =>
  //   toggleCartItem(user.username, boilerPart.id, isInCart)

  const images = normalizeImages(boilerPart.images)
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://auto-c-cars.ru'
  const carId = typeof boilerPart.id === 'number' ? boilerPart.id : 0
  const productUrl = `${baseUrl}/catalog/${carId}`
  const displayName = boilerPart.name || (typeof boilerPart.title === 'string' ? boilerPart.title : 'Автомобиль')
  const priceValue = safeNumber(boilerPart.price)

  return (
      <section itemScope itemType="https://schema.org/Product" aria-labelledby="product-heading">
        <div className="container">
          <div className={`${styles.part__top} ${darkModeClass}`}>
            <h2 id="product-heading" className={`${styles.part__title} ${darkModeClass}`} itemProp="name">
              {displayName}
            </h2>
            <div className={styles.part__inner}>
              <PartImagesList />
              <div className={styles.part__info}>
                {!boilerPart.sale && (
                  <span
                    itemScope
                    itemType="https://schema.org/Offer"
                    className={`${styles.part__info__price} ${darkModeClass}`}
                  >
                    <meta itemProp="priceCurrency" content="RUB" />
                    <meta itemProp="price" content={priceValue.toString()} />
                    <meta itemProp="availability" content={boilerPart.in_stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"} />
                    <meta itemProp="url" content={productUrl} />
                    <span>
                      {formatPrice(priceValue)} ₽
                    </span>
                  </span>
                )}
                <span className={styles.part__info__stock}>
                  {boilerPart.sale ? (
                    <span className={styles.part__info__stock__sold}>
                      ПРОДАНО
                    </span>
                  ) : boilerPart.in_stock > 0 ? (
                    <span className={styles.part__info__stock__success}>
                      В наличии
                    </span>
                  ) : (
                    <span className={styles.part__info__stock__not}>Нет в наличии</span>
                  )}
                </span>
                {boilerPart.Model !== null && (
                  <h4 className={styles.part__info__text}>
                    <span>Модель: </span>
                    <span itemProp="model">{boilerPart.Model}</span>
                  </h4>
                )}
                {boilerPart.Year !== null && (
                  <h4 className={styles.part__info__text}>
                    <span>Год: </span>
                    <span itemProp="productionDate">{boilerPart.Year}</span>
                  </h4>
                )}
                {boilerPart.Mileage !== null && (
                  <h4 className={styles.part__info__text}>
                    <span>Пробег: </span>
                    <span itemProp="mileageFromOdometer">{boilerPart.Mileage}</span>
                  </h4>
                )}
                {boilerPart.Engine !== null && (
                  <h4 className={styles.part__info__text}>
                    <span>Двигатель: </span>
                    <span itemProp="vehicleEngine">{boilerPart.Engine}</span>
                  </h4>
                )}
                {boilerPart.fuel && (
                  <h4 className={styles.part__info__text}>
                    <span>Топливо: </span>
                    <span itemProp="fuelType">{boilerPart.fuel}</span>
                  </h4>
                )}
                {boilerPart.gearbox && (
                  <h4 className={styles.part__info__text}>
                    <span>КПП: </span>
                    <span itemProp="vehicleTransmission">{boilerPart.gearbox}</span>
                  </h4>
                )}
                {boilerPart.drive && (
                  <h4 className={styles.part__info__text}>
                    <span>Привод: </span>
                    <span itemProp="driveWheelConfiguration">{boilerPart.drive}</span>
                  </h4>
                )}
                {boilerPart.powerValue && (
                  <h4 className={styles.part__info__text}>
                    <span>Мощность: </span>
                    <span itemProp="vehicleEngine">{boilerPart.powerValue} {boilerPart.powerType}</span>
                  </h4>
                )}
                {(boilerPart.vin || boilerPart.vendor_code) && boilerPart.vendor_code !== '???' && (
                  <h4 className={styles.part__info__text}>
                    <span>VIN: </span>{'*'.repeat(17)}
                  </h4>
                )}
                {boilerPart.Drive !== null && (
                  <h4 className={styles.part__info__text}>
                    <span>Трансмиссия: </span>{boilerPart.Drive}
                  </h4>
                )}
                {boilerPart.createdAt !== null && (
                  <h4 className={styles.part__info__text}>
                    <span>Объявление размещено: </span>
                    {new Date(boilerPart.createdAt).toLocaleString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </h4>
                )}
                {!isMobile && <PartTabs />}
              </div>
            </div>
          </div>
          {isMobile && (
            <div className={styles.part__accordion}>
              <div className={styles.part__accordion__inner}>
                <PartAccordion title="Описание">
                  <div
                    className={`${styles.part__accordion__content} ${darkModeClass}`}
                  >
                    <p
                      className={`${styles.part__tabs__content__text} ${darkModeClass}`}
                      itemProp="description"
                    >
                      {boilerPart.description}
                    </p>
                  </div>
                </PartAccordion>
              </div>
            </div>
          )}
          <div className={styles.part__bottom}>
            <h2 className={`${styles.part__title} ${darkModeClass}`}>
              <span>Вам понравится</span>
            </h2>
            <DashboardSlider
              goToPartPage
              spinner={spinnerSlider}
              items={Array.isArray(boilerParts?.rows) ? boilerParts.rows.filter((part) => part.in_stock > 0) : []}
            />
          </div>
        </div>
        {/* Hidden structured data for SEO */}
        <meta itemProp="brand" content={boilerPart.brand || boilerPart.boiler_manufacturer} />
        {images.length > 0 && (
          <link itemProp="image" href={images[0]} />
        )}
        {boilerPart.description && (
          <meta itemProp="description" content={boilerPart.description} />
        )}
        <meta itemProp="sku" content={carId ? carId.toString() : undefined} />
        {boilerPart.vin && (
          <meta itemProp="vehicleIdentificationNumber" content={boilerPart.vin} />
        )}
      </section>
  )
}

export default PartPage
