import { useState } from 'react'
import styles from './CarImage.module.scss'

interface CarImageProps {
  src?: string
  alt: string
  className?: string
  fallbackText?: string
}

const CarImage = ({ 
  src, 
  alt, 
  className = '', 
  fallbackText = 'Фото удалено по просьбе владельца' 
}: CarImageProps) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Проверяем, есть ли валидное изображение
  const hasValidImage = src && 
    src !== '[]' && 
    src !== 'null' && 
    src !== '' && 
    !imageError

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  if (!hasValidImage) {
    return (
      <div className={`${styles.car_image__placeholder} ${className}`}>
        <div className={styles.car_image__placeholder__content}>
          <div className={styles.car_image__placeholder__icon}>
            🚗
          </div>
          <div className={styles.car_image__placeholder__text}>
            {fallbackText}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.car_image__container} ${className}`}>
      {!imageLoaded && (
        <div className={styles.car_image__loading}>
          <div className={styles.car_image__loading__spinner}></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onError={handleImageError}
        onLoad={handleImageLoad}
        className={`${styles.car_image} ${imageLoaded ? styles.car_image__loaded : ''}`}
      />
    </div>
  )
}

export default CarImage
