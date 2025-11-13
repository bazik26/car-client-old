/* eslint-disable @next/next/no-img-element */
import { useCallback, useState } from 'react'
import classNames from 'classnames'
import styles from '@/styles/part/index.module.scss'

interface PartSliderProps {
  images: string[]
  currentIndex: number
  onChange: (index: number) => void
}

const PartSlider = ({ images, currentIndex, onChange }: PartSliderProps) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)

  const fallbackImages = images.length > 0 ? images : ['/img/logo.png']

  const prev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? fallbackImages.length - 1 : (currentIndex - 1) % fallbackImages.length
    onChange(newIndex)
  }, [currentIndex, fallbackImages.length, onChange])

  const next = useCallback(() => {
    const newIndex = (currentIndex + 1) % fallbackImages.length
    onChange(newIndex)
  }, [currentIndex, fallbackImages.length, onChange])

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0].clientX)
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(event.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const delta = touchStartX - touchEndX
      if (Math.abs(delta) > 50) {
        if (delta > 0) {
          next()
        } else {
          prev()
        }
      }
    }
    setTouchStartX(null)
    setTouchEndX(null)
  }

  return (
    <div
      className={styles.part__slider}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
        type="button"
        aria-label="Предыдущее фото"
        className={classNames(styles.part__slider__nav, styles.part__slider__nav_prev)}
        onClick={prev}
      >
        ‹
      </button>

      <div className={styles.part__slider__viewport}>
        <div
          className={styles.part__slider__track}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {fallbackImages.map((src, index) => (
            <div className={styles.part__slider__item} key={`${src}-${index}`}>
              <img
                src={src || '/img/logo.png'}
                alt={`image-${index + 1}`}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.src = '/img/logo.png'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Следующее фото"
        className={classNames(styles.part__slider__nav, styles.part__slider__nav_next)}
        onClick={next}
      >
        ›
      </button>

      {fallbackImages.length > 1 && (
        <div className={styles.part__slider__dots}>
          {fallbackImages.map((_, index) => (
            <button
              type="button"
              key={index}
              className={classNames(styles.part__slider__dot, {
                [styles.part__slider__dot_active]: index === currentIndex,
              })}
              onClick={() => onChange(index)}
              aria-label={`Перейти к фото ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PartSlider
