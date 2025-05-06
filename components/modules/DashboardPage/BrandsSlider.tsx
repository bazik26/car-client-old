/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line prettier/prettier

import Slider from 'react-slick'
import { useStore } from 'effector-react'
import { useEffect } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { $mode } from '@/context/mode'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import BrandsSliderNextArrow from '@/components/elements/BrandsSliderNextArrow/BrandsSliderNextArrow'
import BrandsSliderPrevArrow from '@/components/elements/BrandsSliderPrevArrow/BrandsSliderPrevArrow'
import styles from '@/styles/dashboard/index.module.scss'
import Link from 'next/link'

const BrandsSlider = () => {
  const isMedia768 = useMediaQuery(768)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? styles.dark_mode : ''

  const brandItems = [
    {
      id: 1,
      brand: 'AUDI',
      img: '/img/brands/AUDI.png',
      darkImg: '/img/brands/AUDI1.png',
      alt: 'AUDI',
    },
    {
      id: 2,
      brand: 'BMW',
      img: '/img/brands/BMW.png',
      darkImg: '/img/brands/BMW.png',
      alt: 'BMW',
    },
    {
      id: 3,
      brand: 'CHERY',
      img: '/img/brands/CHERY.png',
      darkImg: '/img/brands/CHERY.png',
      alt: 'CHERY',
    },
    {
      id: 4,
      brand: 'CHEVROLET',
      img: '/img/brands/CHEVROLET.png',
      darkImg: '/img/brands/CHEVROLET.png',
      alt: 'CHEVROLET',
    },
    {
      id: 5,
      brand: 'CITROEN',
      img: '/img/brands/CITROEN.png',
      darkImg: '/img/brands/CITROEN1.png',
      alt: 'CITROEN',
    },
    {
      id: 6,
      brand: 'FORD',
      img: '/img/brands/FORD.png',
      darkImg: '/img/brands/FORD.png',
      alt: 'FORD',
    },
    {
      id: 7,
      brand: 'GEELY',
      img: '/img/brands/GEELY.png',
      darkImg: '/img/brands/GEELY.png',
      alt: 'GEELY',
    },
    {
      id: 8,
      brand: 'HAVAL',
      img: '/img/brands/HAVAL.png',
      darkImg: '/img/brands/HAVAL1.png',
      alt: 'HAVAL',
    },
    {
      id: 9,
      brand: 'HONDA',
      img: '/img/brands/HONDA.png',
      darkImg: '/img/brands/HONDA.png',
      alt: 'HONDA',
    },
    {
      id: 10,
      brand: 'HYUNDAI',
      img: '/img/brands/HYUNDAI.png',
      darkImg: '/img/brands/HYUNDAI.png',
      alt: 'HYUNDAI',
    },
    {
      id: 11,
      brand: 'KIA',
      img: '/img/brands/KIA.png',
      darkImg: '/img/brands/KIA.png',
      alt: 'KIA',
    },
    {
      id: 12,
      brand: 'LAND_ROVER',
      img: '/img/brands/LAND_ROVER.png',
      darkImg: '/img/brands/LAND_ROVER.png',
      alt: 'LAND ROVER',
    },
  ]

  useEffect(() => {
    const slider = document.querySelector(
      `.${styles.dashboard__brands__slider}`
    )

    const list = slider?.querySelector('.slick-list') as HTMLElement

    // if (list) {
    //   list.style.height = isMedia768 ? '160px' : '220px'
    // }
  }, [isMedia768])

  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    nextArrow: <BrandsSliderNextArrow modeClass={darkModeClass} />,
    prevArrow: <BrandsSliderPrevArrow modeClass={darkModeClass} />,
  }

  return (
    <Slider {...settings} className={styles.dashboard__brands__slider}>
      {brandItems.map((item) => (
        <Link
          key={item.id}
          href={`/catalog?boiler=${encodeURIComponent(
            JSON.stringify([item.brand])
          )}&offset=1`}
          passHref
        >
          <div
            className={`${styles.dashboard__brands__slide} ${darkModeClass}`}
            style={{ width: isMedia768 ? 124 : 180 }}
          >
            <img
              src={mode === 'dark' ? item.darkImg : item.img}
              alt={item.alt}
            />
          </div>
        </Link>
      ))}
    </Slider>
  )
}

export default BrandsSlider
