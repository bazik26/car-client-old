/* eslint-disable @next/next/no-img-element */
import { IPartImagesItemProps } from '@/types/part'
import styles from '@/styles/part/index.module.scss'
import CarImage from '@/components/elements/CarImage/CarImage'

const PartImagesItem = ({ src, callback, alt }: IPartImagesItemProps) => {
  const changeMainImage = () => callback(src)

  return (
    <li className={styles.part__images__list__item} onClick={changeMainImage}>
      <CarImage src={src} alt={alt} className={styles.part__images__list__thumb} />
    </li>
  )
}

export default PartImagesItem
