/* eslint-disable @next/next/no-img-element */
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/part/index.module.scss'
import CarImage from '@/components/elements/CarImage/CarImage'

const PartSlider = ({ images }: { images: string[] }) => {
  const isMobile700 = useMediaQuery(700)
  const isMobile530 = useMediaQuery(530)
  const sliderImages = images.length > 0 ? images : ['']

  const settings = {
    dots: false,
    infinite: true,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    arrows: false,
    slidesToScroll: 1,
  }

  return (
    <Slider {...settings} className={styles.part__slider}>
      {sliderImages.map((src, i) => (
        <div
          className={styles.part__slide}
          key={i}
          style={{ width: isMobile530 ? 228 : isMobile700 ? 350 : 593 }}
        >
          <CarImage src={src} alt={`image-${i + 1}`} className={styles.part__slide__img} />
        </div>
      ))}
    </Slider>
  )
}

export default PartSlider
