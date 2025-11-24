/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { useEffect, useMemo, useState } from 'react'
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
  const images = useMemo(() => normalizeImages(boilerPart.images), [boilerPart.images])
  const displayName = boilerPart.name || (typeof boilerPart.title === 'string' ? boilerPart.title : 'Автомобиль')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setCurrentIndex(0)
  }, [images])

  const currentImage = images[currentIndex] ?? '/img/logo.png'

  return (
    <div className={styles.part__images}>
      {isMobile ? (
        <PartSlider images={images} currentIndex={currentIndex} onChange={setCurrentIndex} />
      ) : (
        <>
          <div className={styles.part__images__main}>
            <CarImage 
              key={currentImage}
              src={currentImage} 
              alt={displayName}
              className={styles.part__images__main__img}
            />
          </div>
          <ul className={styles.part__images__list}>
            {images.map((item, i) => (
              <PartImagesItem
                key={`${item}-${i}`}
                alt={`image-${i + 1}`}
                src={item}
                index={i}
                isActive={i === currentIndex}
                onSelect={setCurrentIndex}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default PartImagesList
