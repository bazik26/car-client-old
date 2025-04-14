import Image from 'next/image'
import { useStore } from 'effector-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { $mode } from '@/context/mode'
import {
  tab1Text,
  tab2Text,
  tab3Text,
  tab4Text,
} from '@/utils/shipping-payment'
import styles from '@/styles/shippingPayment/index.module.scss'

const ShippingPayment = () => {
  const [tab1, setTab1] = useState(true)
  const [tab2, setTab2] = useState(false)
  const [tab3, setTab3] = useState(false)
  const [tab4, setTab4] = useState(false)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const handleTab1 = () => {
    setTab1(true)
    setTab2(false)
    setTab3(false)
    setTab4(false)
  }

  const handleTab2 = () => {
    setTab1(false)
    setTab2(true)
    setTab3(false)
    setTab4(false)
  }

  const handleTab3 = () => {
    setTab1(false)
    setTab2(false)
    setTab3(true)
    setTab4(false)
  }

  const handleTab4 = () => {
    setTab1(false)
    setTab2(false)
    setTab3(false)
    setTab4(true)
  }

  return (
    <section className={styles.shipping_payment}>
      <div className="container">
        <h2 className={`${styles.shipping_payment__title} ${darkModeClass}`}>
          Доставка и оплата
        </h2>
        <div className={`${styles.shipping_payment__tabs} ${darkModeClass}`}>
          <ul className={styles.shipping_payment__tabs__controls}>
            <li
              className={`${styles.shipping_payment__tabs__controls__item} ${
                tab1 ? styles.active : ''
              } ${darkModeClass}`}
            >
              <button className={darkModeClass} onClick={handleTab1}>
                Как происходит покупка автомобиля из США, Европы и Кореи?
              </button>
            </li>
            <li
              className={`${styles.shipping_payment__tabs__controls__item} ${
                tab2 ? styles.active : ''
              } ${darkModeClass}`}
            >
              <button className={darkModeClass} onClick={handleTab2}>
                Какие гарантии мы предоставляем?
              </button>
            </li>
            <li
              className={`${styles.shipping_payment__tabs__controls__item} ${
                tab3 ? styles.active : ''
              } ${darkModeClass}`}
            >
              <button className={darkModeClass} onClick={handleTab3}>
                Сколько стоит пригон автомобиля?
              </button>
            </li>
            <li
              className={`${styles.shipping_payment__tabs__controls__item} ${
                tab4 ? styles.active : ''
              } ${darkModeClass}`}
            >
              <button className={darkModeClass} onClick={handleTab4}>
                Какие риски существуют и как их избежать?
              </button>
            </li>
          </ul>
          <div
            className={`${styles.shipping_payment__tabs__content} ${darkModeClass}`}
          >
            {tab1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.shipping_payment__tabs__content__text}
              >
                {tab1Text}
              </motion.div>
            )}
            {tab2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.shipping_payment__tabs__content__text}
              >
                {tab2Text}
              </motion.p>
            )}
            {tab3 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.shipping_payment__tabs__content__text}
              >
                {tab3Text}
              </motion.p>
            )}
            {tab4 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.shipping_payment__tabs__content__text}
              >
                {tab4Text}
              </motion.p>
            )}
          </div>
        </div>
        <h2 className={`${styles.shipping_payment__title} ${darkModeClass}`}>
          Экономия на растаможке: Почему выгодно заказывать авто через нас?
        </h2>
        <p className={`${styles.shipping_payment__text} ${darkModeClass}`}>
          При ввозе автомобиля в Россию стоимость таможенных платежей
          существенно зависит от цели ввоза. Для физических лиц действует
          льготный утилизационный сбор, который значительно снижает итоговую
          стоимость машины. Например, при покупке авто за 10 000 € (около 958
          000 ₽) разница в таможенных сборах следующая: Для личного пользования:
          ~929 000 ₽ На коммерцию: ~2 098 000 ₽ Экономия – более 1 169 000 ₽!
          Почему с нами выгодно? Мы помогаем нашим клиентам приобретать
          автомобили по более низкой цене, оптимизируя процесс растаможки.
          Благодаря нашему опыту, вы получаете надежное авто с минимальными
          затратами.
        </p>
        <div className={`${styles.shipping_payment__block}`}>
          <div
            className={`${styles.shipping_payment__block__img} ${styles.shipping_payment__block__img__top}`}
          >
            <Image src="/img/drom1.jpg" alt="drom1" width={500} height={500} />
          </div>
          <div
            className={`${styles.shipping_payment__block__img} ${styles.shipping_payment__block__img__bottom}`}
          >
            <Image src="/img/drom2.jpg" alt="drom2" width={500} height={500} />
          </div>
        </div>
        <p className={`${styles.shipping_payment__text} ${darkModeClass}`}>
          Расчет стоимости автомобиля для примера. Информация взята с сайта
          drom.ru.
        </p>
        <h2 className={`${styles.shipping_payment__title} ${darkModeClass}`}>
          Пример договора OOO &quot;ТЛТТРАНС&quot;
        </h2>
        <p className={`${styles.shipping_payment__text} ${darkModeClass}`}>
          Ознакомьтесь c договором, который заключается с клиентами. Этот документ поможет вам
          понять этапы работы, гарантии и обязанности сторон.
        </p>
        <div className={styles.shipping_payment__lockbtn}>
          <Image
            className={styles.shipping_payment__lockbtn__img}
            src="/img/tltimg.jpg"
            alt="tltimg"
            width={500}
            height={500}
          />
          <a
            href="/files/ТЛТТРАНС.pdf"
            download
            className={styles.shipping_payment__lockbtn__btn}
          >
            Скачать PDF
          </a>
        </div>
      </div>
    </section>
  )
}

export default ShippingPayment
