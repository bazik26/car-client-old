import { useStore } from 'effector-react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { $boilerPart } from '@/context/boilerPart'
import { $mode } from '@/context/mode'
import PartImagesList from '@/components/modules/PartPage/PartImagesList'
import { formatPrice } from '@/utils/common'
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

  return (
      <section>
        <div className="container">
          <div className={`${styles.part__top} ${darkModeClass}`}>
            <h2 className={`${styles.part__title} ${darkModeClass}`}>
              {boilerPart.name}
            </h2>
            <div className={styles.part__inner}>
              <PartImagesList />
              <div className={styles.part__info}>
                <span className={`${styles.part__info__price} ${darkModeClass}`}>
                  {formatPrice(boilerPart.price || 0)} P
                </span>
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
                    <span>Модель: </span>{boilerPart.Model}
                  </h4>
                )}
                {boilerPart.Year !== null && (
                  <h4 className={styles.part__info__text}>
                    <span>Год: </span>{boilerPart.Year}
                  </h4>
                )}
                {boilerPart.Mileage !== null && (
                  <h4 className={styles.part__info__text}>
                    <span>Пробег: </span>{boilerPart.Mileage}
                  </h4>
                )}
                {boilerPart.Engine !== null && (
                  <h4 className={styles.part__info__text}>
                    <span>Двигатель: </span>{boilerPart.Engine}
                  </h4>
                )}
                {boilerPart.Engine !== null && (
                  <h4 className={styles.part__info__text}>
                    <span>Топливо: </span>{boilerPart.fuel}
                  </h4>
                )}
                {boilerPart.gearbox && (
                  <h4 className={styles.part__info__text}>
                    <span>КПП: </span>{boilerPart.gearbox}
                  </h4>
                )}
                {boilerPart.drive && (
                  <h4 className={styles.part__info__text}>
                    <span>Привод: </span>{boilerPart.drive}
                  </h4>
                )}
                {boilerPart.powerValue && (
                  <h4 className={styles.part__info__text}>
                    <span>Мощность: </span>{boilerPart.powerValue} {boilerPart.powerType}
                  </h4>
                )}
                {boilerPart.vin && (
                  <h4 className={styles.part__info__text}>
                    <span>VIN: </span>{boilerPart.vin}
                  </h4>
                )}
                {boilerPart.Drive !== null && (
                  <h4 className={styles.part__info__text}>
                    <span>Трансмиссия: </span>{boilerPart.Drive}
                  </h4>
                )}
                {boilerPart.vendor_code !== '???' && (
                  <h4 className={styles.part__info__text}>
                    <span>VIN: </span>{boilerPart.vendor_code}
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
                <PartAccordion title="Характеристики">
                  <div
                    className={`${styles.part__accordion__content} ${darkModeClass}`}
                  >
                    <h3
                      className={`${styles.part__tabs__content__title} ${darkModeClass}`}
                    >
                      {boilerPart.name}
                    </h3>
                    <p
                      className={`${styles.part__tabs__content__text} ${darkModeClass}`}
                    >
                      {boilerPart.compatibility}
                    </p>
                  </div>
                </PartAccordion>
              </div>
              {/* <PartAccordion title="Описание">
                <div
                  className={`${styles.part__accordion__content} ${darkModeClass}`}
                >
                  <p
                    className={`${styles.part__tabs__content__text} ${darkModeClass}`}
                  >
                    {boilerPart.description}
                  </p>
                </div>
              </PartAccordion> */}
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
      </section>
  )
}

export default PartPage
