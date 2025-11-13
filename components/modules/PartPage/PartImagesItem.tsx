/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames'
import type { SyntheticEvent } from 'react'
import { IPartImagesItemProps } from '@/types/part'
import styles from '@/styles/part/index.module.scss'

const PartImagesItem = ({ src, alt, index, isActive, onSelect }: IPartImagesItemProps) => {
  const handleClick = () => onSelect(index)

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = '/img/logo.png'
  }

  return (
    <li
      className={classNames(styles.part__images__list__item, {
        [styles.part__images__list__item__active]: isActive,
      })}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          handleClick()
        }
      }}
    >
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
