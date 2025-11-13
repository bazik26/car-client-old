/* eslint-disable @next/next/no-img-element */
import type { SyntheticEvent } from 'react'
import { IPartImagesItemProps } from '@/types/part'
import styles from '@/styles/part/index.module.scss'

const PartImagesItem = ({ src, callback, alt }: IPartImagesItemProps) => {
  const changeMainImage = () => callback(src)
  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget
    target.src = '/img/logo.png'
  }

  return (
    <li className={styles.part__images__list__item} onClick={changeMainImage}>
      <img
        src={src || '/img/logo.png'}
        alt={alt}
        className={styles.part__images__list__thumb}
        loading="lazy"
        onError={handleError}
      />
    </li>
  )
}

export default PartImagesItem
