/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import Slider from 'react-slick'
import { useStore } from 'effector-react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import { useEffect } from 'react'
import { $mode } from '@/context/mode'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { IDashboardSlider } from '@/types/dashboard'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import { formatPrice } from '@/utils/common'
import styles from '@/styles/dashboard/index.module.scss'

const DashboardSlider = ({
  items,
  spinner,
}: // goToPartPage,
IDashboardSlider) => {
  const isMedia768 = useMediaQuery(768)
  const isMedia1366 = useMediaQuery(1366)
  const isMedia800 = useMediaQuery(800)
  const isMedia560 = useMediaQuery(560)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    const slider = document.querySelectorAll(`.${styles.dashboard__slider}`)

    slider.forEach((item) => {
      const list = item.querySelector('.slick-list') as HTMLElement

      // list.style.height = isMedia560 ? '276px' : '390px'
      list.style.padding = '10px 5px'
      list.style.marginRight = isMedia560 ? '-8px' : isMedia800 ? '-15px' : '0'
    })
  }, [isMedia560, isMedia800])

  const settings = {
    dots: false,
    infinite: true,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    arrows: false,
    // slidesToScroll: isMedia768 ? 1 : 2,
  }

  const width = {
    width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344,
  }

  return (
    <Slider {...settings} className={styles.dashboard__slider}>
      {spinner ? (
        [...Array(8)].map((_, i) => (
          <div
            className={`${skeletonStyles.skeleton__item} ${
              mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
            }`}
            key={i}
            style={width}
          >
            <div className={skeletonStyles.skeleton__item__light} />
          </div>
        ))
      ) : items.length ? (
        items.map((item) => (
          <Link href={`/catalog/${item.id}`}  passHref legacyBehavior>
            <a target='_blank'>
              <div
                className={`${styles.dashboard__slide} ${darkModeClass}`}
                key={item.id}
                style={width}
              >
                <img src={JSON.parse(item.images)[0]} alt={item.name} />
                <div className={styles.dashboard__slide__inner}>
                  <h3 className={styles.dashboard__slide__title}>{item.name}</h3>
                  {/* {item.Model !== null && <h4 className={styles.dashboard__slide__text}>Модель: {item.Model}</h4>} */}
                  {item.Year !== null && <h4 className={styles.dashboard__slide__text}><span>Год: </span>{item.Year}</h4>}
                  {item.Mileage !== null && <h4 className={styles.dashboard__slide__text}><span>Пробег: </span>{item.Mileage}</h4>}
                  {item.Engine !== null && <h4 className={styles.dashboard__slide__text}><span>Двигатель: </span>{item.Engine}</h4>}
                  {item.fuel !== null && <h4 className={styles.dashboard__slide__text}><span>Топливо: </span>{item.fuel}</h4>}
                  {/* {item.Transmission !== null && <h4 className={styles.dashboard__slide__title}>Трансмиссия: {item.Transmission}</h4>} */}
                  {/* {item.Drive !== null && <h4 className={styles.dashboard__slide__title}>Привод: {item.Drive}</h4>} */}
                  {/* {item.vendor_code !== '???' && (
                    <span className={styles.dashboard__slide__code}>
                      VIN: {item.vendor_code}
                    </span>
                  )} */}
                  {item.in_stock > 0 ? (
                    <div className={styles.dashboard__slide__text__on}>
                      В наличии
                    </div>
                  ) : (
                    <div className={styles.dashboard__slide__text__off}>
                      Продан
                    </div>
                  )}
                  <br />
                  <div className={styles.dashboard__slide__price}>
                    {formatPrice(item.price)} P
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))
      ) : (
        <span>Список товаров пуст....</span>
      )}
    </Slider>
  )
}

export default DashboardSlider
