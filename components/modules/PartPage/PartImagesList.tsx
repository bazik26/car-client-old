/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { $boilerPart } from '@/context/boilerPart'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import PartImagesItem from './PartImagesItem'
import PartSlider from './PartSlider'
import styles from '@/styles/part/index.module.scss'
import CarImage from '@/components/elements/CarImage/CarImage'
import { normalizeImages } from '@/utils/common'

const PartImagesList = () => {
  const boilerPart = useStore($boilerPart)
  const isMobile = useMediaQuery(850)
  const images = normalizeImages(boilerPart.images)
  const [currentImgSrc, setCurrentImgSrc] = useState(images[0] ?? '')

  useEffect(() => {
    setCurrentImgSrc(images[0] ?? '')
  }, [images])

  return (
    <div className={styles.part__images}>
      {isMobile ? (
        <PartSlider images={images} />
      ) : (
        <>
          <div className={styles.part__images__main}>
            <CarImage 
              src={currentImgSrc || images[0]} 
              alt={boilerPart.name}
              className={styles.part__images__main__img}
            />
          </div>
          <ul className={styles.part__images__list}>
            {images.map((item, i) => (
              <PartImagesItem
                key={i}
                alt={`image-${i + 1}`}
                callback={setCurrentImgSrc}
                src={item}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default PartImagesList
