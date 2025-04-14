/* eslint-disable prettier/prettier */

import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/contacts/index.module.scss'
import MailSvg from '@/components/elements/MailSvg/MailSvg'
import '@/styles/contacts/contacts.css';
import '@/styles/contacts/buttons.css';
import '@/styles/contacts/buttons2.css';

const ContactsPage = ({ isWholesaleBuyersPage = false }) => {
  const mode = useStore($mode)
  const isMobile560 = useMediaQuery(560)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const handleClick = () => {
    const form = document.querySelector('.formbord') as HTMLElement
  
    if (form) {
      if (window.innerWidth > 560) {
        form.style.display = 'flex'
      } else {
        form.style.right = '0px'
      }
    }
  }

  return (
    <section className={styles.contacts}>
      <div className="container">
        <h2 className={`${styles.contacts__title} ${darkModeClass}`}>
          {isWholesaleBuyersPage ? 'Оптовым покупателям' : 'Контакты'}
        </h2>
        <div className={styles.contacts__inner}>
          <ul className={`${styles.contacts__list} ${darkModeClass}`}>
              <li className={styles.contacts__list__title}>
                <h3 className={darkModeClass}>
                  ООО "ТЛТТРАНС"
                </h3>
              </li>
              <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
                <span>Офис: </span>
                <span>
                  445043, Самарская область, г. Тольятти, Южное ш., д. 24, офис 202 
                </span>
              </li>
              <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
                <span>График работы: </span>
                <span> Пн-Вс с 8:30 до 19:00</span>
              </li>
              <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
                <span>ОГРН: </span>
                <span>1196313052858</span>
              </li>
              <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
                <span>ИНН: </span>
                <span>6320037339</span>
              </li>
          </ul>
          <ul className={`${styles.contacts__list} ${darkModeClass}`}>
              <li className={styles.contacts__list__title}>
                <h3 className={darkModeClass}>
                  ООО "АВТО-С"
                </h3>
              </li>
              <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
                <span>Офис: </span>
                <span>
                  183039, Мурманская область, г. Мурманск, ул. Академика Книповича, д. 23, офис 119 
                </span>
              </li>
              <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
                <span>График работы офиса: </span>
                <span> Пн-Сб с 8:00 до 20:00</span>
              </li>
              <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
                <span>ОГРН: </span>
                <span>1175190000358</span>
              </li>
              <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
                <span>ИНН: </span>
                <span>5190067377</span>
              </li>
          </ul>
        </div>
        <div className="contacts__sticky-panel sticky-block rounded-4 contacts__sticky-panel--without-image">
            <div className="contacts__sticky-panel__info">
              <div className="contacts__sticky-panel__desc contacts__desc" itemProp="description">
                <h3>Свяжитесь с нами</h3>
                <p>
                  Позвоните нам или напишите сообщение. Наши специалисты проконсультируют вас по любому вопросу.
                </p>
              </div>
              <div className="hidden">
                {/* end_frame_cache_header-allcaddr-block1 */}
              </div>
              <div className="contacts__sticky-panel__properties">
                {/* start_frame_cache_header-allcaddr-block1 */}
                <div className="contact-property__value">
                  <div className="contact-property__label font_13 color_999">Центральный офис</div>
                  <a href="https://yandex.ru/maps/-/CHbaBQZt" target='_blank' itemProp="address" className="contact-property__value">
                    445043, Самарская область, г. Тольятти, Южное ш., д. 24, офис 202
                  </a>
                </div>
                <div className="contacts__sticky-panel__property">
                  {/* start_frame_cache_header-allcphones-block1 */}
                  <div className="contact-property contact-property--phones">
                    <div className="contact-property__label font_13 color_999">Телефон</div>
                    <div className="">
                      <div className="contact-property__value" itemProp="telephone">
                        <a href="tel:+79283347225">+7 (928) 334-72-25</a>
                      </div>
                    </div>
                  </div>
                  {/* end_frame_cache_header-allcphones-block1 */}
                </div>
                <div className="contacts__sticky-panel__property">
                  {/* start_frame_cache_header-allcemail-block1 */}
                  <div className="contact-property contact-property--email">
                    <div className="contact-property__label font_13 color_999">E-mail</div>
                    <div className="">
                      <div className="contact-property__value" itemProp="email">
                        <a href="mailto:importeurocar@yandex.ru">importeurocar@yandex.ru</a>
                      </div>
                    </div>
                  </div>
                  {/* end_frame_cache_header-allcemail-block1 */}
                </div>
              </div>
              <div className="contacts__sticky-panel__btn-wraper">
                  <button className="btn-qvest" onClick={handleClick}>
                    Написать сообщение
                  </button>
              </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default ContactsPage
