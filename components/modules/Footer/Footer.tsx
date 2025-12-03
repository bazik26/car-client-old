/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import Num from '@/components/elements/Num/Num'
import PhoneSvg from '@/components/elements/PhoneSvg/PhoneSvg'
import MailSvg from '@/components/elements/MailSvg/MailSvg'
import MarkerSvg from '@/components/elements/MarkerSvg/MarkerSvg'
import styles from '@/styles/footer/index.module.scss'

const navigationLinks = [
  { label: 'Каталог', href: '/catalog' },
  { label: 'Доставка и оплата', href: '/shipping-payment' },
  { label: 'О компании', href: '/about' },
  { label: 'Контакты', href: '/contacts' },
]

const serviceLinks = [
  { label: 'Подбор автомобиля', href: '/dashboard' },
  { label: 'Заказ автомобиля', href: '/order' },
  { label: 'FAQ', href: '/privacypolicy' },
  { label: 'Политика конфиденциальности', href: '/privacypolicy' },
]

const socialLinks = [
  { label: 'Telegram', href: 'https://t.me/+BXRLxzmv4rlhZjMy', icon: '/img/telegram.png' },
  { label: 'Instagram', href: 'https://www.instagram.com/avto_c_import/', icon: '/img/instagram-1-svgrepo-com.svg' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@avtocimport', icon: '/img/tiktok-svgrepo-com.svg' },
]

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__grid}>
          <div className={styles.footer__brand}>
            <Link href="/dashboard" legacyBehavior>
              <a className={styles.footer__logo}>
                <img src="/img/d4u9bd1htusd1k9cj1hqvzhd99cqogb2.png" />
              </a>
            </Link>
            <p className={styles.footer__description}>
              Полный цикл подбора и доставки автомобилей из Европы и Азии с гарантией прозрачности на каждом этапе.
            </p>
            <div className={styles.footer__socials}>
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={item.icon} alt={item.label} />
                </a>
              ))}
            </div>
          </div>

          <div className={styles.footer__column}>
            <h4 className={styles.footer__title}>Навигация</h4>
            <ul className={styles.footer__links}>
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footer__column}>
            <h4 className={styles.footer__title}>Сервисы</h4>
            <ul className={styles.footer__links}>
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footer__contacts}>
            <h4 className={styles.footer__title}>Контакты</h4>
            <div className={styles.footer__contactItem}>
              <PhoneSvg />
              <span className={styles.footer__contactLink}>+7 (985) 263-41-64</span>
            </div>
            <a
              className={styles.footer__contactItem}
              href="mailto:auto-c-cars@yandex.ru"
              aria-label="Написать на email"
            >
              <MailSvg />
              <span className={styles.footer__contactLink}>auto-c-cars@yandex.ru</span>
            </a>
            <div className={styles.footer__contactItem}>
              <MarkerSvg />
              <span>183039, Мурманская область, г. Мурманск, ул. Академика Книповича, д. 23, офис 119</span>
            </div>
          </div>
        </div>

        <div className={styles.footer__bottom}>
          <p>© {year} Auto-c. Все права защищены.</p>
          <div className={styles.footer__bottomLinks}>
            <Link href="/privacypolicy">Политика конфиденциальности</Link>
            <a href="https://t.me/+LCUHJvj1n2swZDgy" target="_blank" rel="noopener noreferrer">
              Мы в Telegram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

