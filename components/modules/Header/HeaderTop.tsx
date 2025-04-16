import Link from 'next/link'
import { useStore } from 'effector-react'
import CityButton from '@/components/elements/CityButton/CityButton'
// import ProfileDropdown from './ProfileDropdown'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'
import { $mode } from '@/context/mode'
import { usePopup } from '@/hooks/usePoup'
import styles from '@/styles/header/index.module.scss'
import PhoneSvg from '@/components/elements/PhoneSvg/PhoneSvg'
import Headerbutton from '@/components/elements/Header/Headerbutton'
import FeedbackForm from '../FeedbackForm/FeedbackForm'

const HeaderTop = () => {
  const isMedia950 = useMediaQuery(950)
  const { toggleOpen, open, closePopup } = usePopup()
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const formData = {
    brand: '',
    model: '',
    generation: ''
  }

  return (
    <div className={styles.header__top}>
      <div className={`container ${styles.header__top__container}`}>
        <Link href="/dashboard" legacyBehavior passHref>
          <img src="/img/d4u9bd1htusd1k9cj1hqvzhd99cqogb2.png" alt="mainimg" className={styles.header__top__container__img} width={800} height={600}/>
        </Link>
        <nav
          className={`${styles.header__nav} ${
            open ? styles.open : ''
          } ${darkModeClass}`}
        >
          <ul className={styles.header__nav__list}>
            {isMedia950 && (
                <Link href="/dashboard" legacyBehavior passHref>
                  <img src="/img/d4u9bd1htusd1k9cj1hqvzhd99cqogb2.png" alt="mainimg" className={styles.header__top__container__img2} width={800} height={600}/>
                </Link>
              )}
            <li className={styles.header__nav__list__item}>
              <Link href="/catalog" passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  Каталог
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/shipping-payment" passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  Доставка и оплата
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/about" passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  О нас
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/contacts" passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  Контакты
                </a>
              </Link>
            </li>
            {/* <li className={styles.header__nav__list__item}>
              <Link href="/wholesale-buyers" passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  Оптовым покупателям
                </a>
              </Link>
            </li> */}
            
            {isMedia950 && (
              <>
                <div className={styles.header__nav__list__itembr} /><li className={styles.header__nav__list__item}>
                  <CityButton />
                </li>
              </>
            )}
            {/* {isMedia950 && (
              <li className={styles.header__nav__list__item}>
                <ModeToggler />
              </li>
            )} */}
            {isMedia950 && (
              <>
                <a
                  href="tel:+79283347225"
                  className={styles.header__phone}
                >
                  <span>+7 (928) 334-72-25</span>
                </a>
                <Headerbutton />
                <div className={styles.header__nav__list__itembr}/>
                <li className={styles.header__nav__list__item}>Мы в сети:</li>
                <ul className={styles.header__nav__list2}>
                  <li className={styles.header__nav__list__item}>
                    <a
                      href="https://t.me/+LCUHJvj1n2swZDgy"
                      target="_blank"
                      className={styles.header__nav__list__item__tg}
                      >
                      <img src="/img/telegram.png" alt="telegram"  className={styles.header__nav__list__item__tg__img}/>
                    </a>
                  </li>
                  <li className={styles.header__nav__list__item}>
                    <a
                      href="https://www.tiktok.com/@import_euro_car?_t=ZM-8vYPNyBb3ix&_r=1"
                      target="_blank"
                      className={styles.header__nav__list__item__tg}
                      >
                      <img src="/img/tik-tok.png" alt="tiktok"  className={styles.header__nav__list__item__tg__img}/>
                    </a>
                  </li>
                  <li className={styles.header__nav__list__item}>
                    <a
                      href="https://www.instagram.com/import_euro_car?igsh=dWhvcm15aW8zazVk&utm_source=qr"
                      target="_blank"
                      className={styles.header__nav__list__item__tg}
                      >
                      <img src="/img/instagram.png" alt="instagram"  className={styles.header__nav__list__item__tg__img}/>
                    </a>
                  </li>
                </ul>
              </>
            )}
          </ul>
        </nav>
        {!isMedia950 && <CityButton />}
        {isMedia950 && (
          <button
            onClick={toggleOpen}
            className={`${styles.burger_menu} ${
              open ? styles.open : ''
            } ${darkModeClass}`}
          >
            <span />
            <span />
            <span />
          </button>
        )}
        {!isMedia950 && 
          <>
            <div className={styles.header__phoneborder}></div>
            <a
              href="tel:+79283347225"
              className={styles.header__phone}
            >
              <span>+7 (928) 334-72-25</span>
            </a>
            <Headerbutton />
          </>
        }
        
        {/* <ProfileDropdown /> */}
      </div>
      <div className="formbord">
        <FeedbackForm previousData={formData}/>
      </div>
    </div>
  )
}

export default HeaderTop
