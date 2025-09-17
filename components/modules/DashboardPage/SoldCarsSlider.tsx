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

const SoldCarsSlider = ({
  items,
  spinner,
}: IDashboardSlider) => {
  const isMedia768 = useMediaQuery(768)
  const isMedia1366 = useMediaQuery(1366)
  const isMedia800 = useMediaQuery(800)
  const isMedia560 = useMediaQuery(560)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  console.log('🚨🚨🚨 SOLD CARS SLIDER RENDERED 🚨🚨🚨')
  console.log('🎠 SoldCarsSlider received items:', items)
  console.log('🎠 SoldCarsSlider items length:', items.length)
  console.log('🎠 SoldCarsSlider items details:', items.map(item => `${item.name} (sale: ${item.sale})`))
  console.log('🚨🚨🚨 END SOLD CARS SLIDER 🚨🚨🚨')

  useEffect(() => {
    const slider = document.querySelectorAll(`.${styles.dashboard__slider}`)
    slider.forEach((item) => {
      const list = item.querySelector('.slick-list') as HTMLElement
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
  }

  const width = {
    width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344,
  }

  // Перемешивание товаров при каждой загрузке
  const shuffledItems = [...items].sort(() => Math.random() - 0.5)

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
      ) : shuffledItems.length ? (
        shuffledItems.map((item) => (
          <Link href={`/catalog/${item.id}`} key={item.id} target="_blank" legacyBehavior>
            <a>
              <div
                className={`${styles.dashboard__slide} ${darkModeClass}`}
                style={width}
              >
                <img 
                  src={
                    item.images && item.images !== '[]' && item.images !== 'null'
                      ? JSON.parse(item.images)[0]
                      : '/img/placeholder.png'
                  } 
                  alt={item.name} 
                />
                <div className={styles.dashboard__slide__inner}>
                  <h3 className={styles.dashboard__slide__title}>{item.name}</h3>
                  {item.Year !== null && (
                    <h4 className={styles.dashboard__slide__text}>
                      <span>Год: </span>{item.Year}
                    </h4>
                  )}
                  {item.Mileage !== null && (
                    <h4 className={styles.dashboard__slide__text}>
                      <span>Пробег: </span>{item.Mileage}
                    </h4>
                  )}
                  {item.Engine !== null && (
                    <h4 className={styles.dashboard__slide__text}>
                      <span>Двигатель: </span>{item.Engine}
                    </h4>
                  )}
                  {item.fuel !== null && (
                    <h4 className={styles.dashboard__slide__text}>
                      <span>Топливо: </span>{item.fuel}
                    </h4>
                  )}
                  <div className={styles.dashboard__slide__text__sold}>
                    ПРОДАНО
                  </div>
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
        <span>Список проданных автомобилей пуст....</span>
      )}
    </Slider>
  )
}

export default SoldCarsSlider
