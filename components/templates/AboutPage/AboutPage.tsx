/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import Comments from '@/components/elements/Comments/Comments'
import styles from '@/styles/about/index.module.scss'
import '@/styles/about/style10.css'
import '@/styles/about/sticky.css';
import '@/styles/about/index-page.css';
import '@/styles/about/grid-list.css';
import '@/styles/about/flexbox.css';
import '@/styles/about/styleabout.css';
import '@/styles/about/width-2.css';

const AboutPage: React.FC = () => {
  const mode = useStore($mode)
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
    // <section className={styles.about}>
    //   <div className="container">
    //     <h2 className={`${styles.about__title} ${darkModeClass}`}>
    //       О компании
    //     </h2>
    //     <div className={styles.about__inner}>
    //       <div className={`${styles.about__info} ${darkModeClass}`}>
    //         <p>
    //           ООО «ТЛТТРАНС» — ведущая компания в сфере импорта автомобилей из
    //           США, Европы и Кореи в Россию и Казахстан. Мы предоставляем полный
    //           спектр услуг, начиная с подбора и проверки транспортного средства,
    //           заканчивая его доставкой, таможенным оформлением и регистрацией.
    //           Наши ключевые преимущества: Профессионализм и опыт: Наша команда
    //           состоит из специалистов с многолетним опытом в области
    //           автомобильного импорта и логистики. Надежность и прозрачность: Мы
    //           работаем только с проверенными поставщиками и аукционами,
    //           обеспечивая юридическую чистоту каждой сделки. Индивидуальный
    //           подход: Учитываем все пожелания клиентов, подбирая автомобили,
    //           идеально соответствующие их требованиям и бюджету. Гарантии
    //           качества: Предоставляем гарантию на основные узлы и агрегаты
    //           приобретенных автомобилей, подтверждая их отличное техническое
    //           состояние.
    //         </p>
    //         <p>
    //           Мы стремимся сделать процесс приобретения автомобиля из-за рубежа
    //           максимально комфортным и безопасным для каждого клиента. Мы берем
    //           на себя все организационные вопросы, позволяя вам наслаждаться
    //           покупкой без лишних хлопот. Доверяя нам, вы выбираете качество,
    //           надежность и профессионализм.
    //         </p>
    //       </div>
    //       <div className={`${styles.about__img} ${styles.about__img__top}`}>
    //         <img src="/img/about-img1.jpg" alt="image-1" />
    //       </div>
    //       {/* <div className={`${styles.about__img} ${styles.about__img__bottom}`}>
    //         <img src="/img/about-img-2.png" alt="image-2" />
    //       </div> */}
    //     </div>
    //     <Comments />
    //   </div>
    // </section>
  <>
    <div className="drag-block container COMPANY_TEXT " data-className="company_text_drag" data-order="3">
		  <div className="index-block index-block--padding-top-80 index-block--padding-bottom-80 index-block--fon index-block--delimiter ">
			  <div className="company-item front_company_w_videos-template">
		      <div className="company-item__wrapper company-item--IMG_SIDE2">
            <div className="maxwidth-theme">
              <div className="flexbox flexbox--direction-row flexbox--column-t991">
                <div className="company-item__heading  company-item__heading--RIGHT flex-1">
                  <div className="sticky-block flexbox--mb20-t991">
                    <div className="index-block__subtitle index-block__subtitle--margined-f992">О компании</div>
                    <h3 className="index-block__title switcher-title">Надежный поставщик автомобилей из Европы</h3>
                    <div className="company-item__text  index-block__preview">Компания Import Euro Car специализируется на поставке автомобилей среднего и премиум-класса из Европы. Работаем под заказ. Для тех, кто не хочет ждать, всегда есть автомобили в наличии.</div>
                    <div className="more-yt-videos">
                      <div className="more-yt-videos__video">
                        <video
                          src="/video/IMG_1650.MOV"
                          controls
                          poster="/img/logo16.9.png"
                          controlsList="nodownload"
                          preload="metadata"
                          style={{ width: '100%', height: '400px', margin: '20px 0px' }}
                        />
                      </div>
                      <div className="more-yt-videos__video">
                        <video
                          src="/video/IMG_3980111.MOV"
                          controls
                          poster="/img/logo16.9.png"
                          controlsList="nodownload"
                          preload="metadata"
                          style={{ width: '100%', height: '400px', margin: '20px 0px' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="sticky-block company-item__info">
                    <div className=" company-item__picture-wrapper ">
                      <div className="company-item__picture bg-fix company-item__picture--no-fon company-item__picture--static lazyloaded" style={{ backgroundImage: `url("/img/uxhzvmb681dmm7wy68z0vki0kxeys6qp.jpg")` }} data-bg="/upload/resize_cache/iblock/7f9/2000_2000_0/uxhzvmb681dmm7wy68z0vki0kxeys6qp.jpg">
                    </div>
                        </div>
                                                                  <div className="company-item__dop-text company-item--mt-49"><p>
      Мы находим эксклюзивные комплектации по запросу клиента и просто автомобили, которых нет в продаже в России. При этом не завышаем цену и не придумываем непонятных схем.
    </p>
    <p>
      Ценим время и доверие клиентов, поэтому честно говорим о комиссии.
    </p></div>
                                                      <div className="company-item__tizers company-item--mt-49">											
        <div className="tizers-list  tizers-list--wide">
        
        <div className="tizers-list__items-wrapper grid-list grid-list--items--wide   ">
                  <div className="tizers-list__item-wrapper  grid-list__item tizers-list__item-wrapper-offset">
              <div className="tizers-list__item  tizers-list__item--images-ICONS tizers-list__item--images-position-TOP tizers-list__item--column" id="bx_651765591_39">
                
                              <div className="tizers-list__item-image-wrapper tizers-list__item-image-wrapper--ICONS tizers-list__item-image-wrapper--position-TOP">
                                                          <i className="svg inline  svg-inline- fill-theme tizers-list__item-image-icon" aria-hidden="true">
                                                              <svg width="50" height="50" viewBox="0 0 50 50" fill="#ff0000" xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M25 0C25.5523 0 26 0.447715 26 1V1.88197L33.4472 5.60557C33.6294 5.69665 33.7716 5.83582 33.8662 6H48C49.1046 6 50 6.89543 50 8V10C50 11.1046 49.1046 12 48 12V39C48 40.1046 47.1046 41 46 41H26V44.382L33.4472 48.1056C33.9412 48.3526 34.1414 48.9532 33.8944 49.4472C33.6474 49.9412 33.0468 50.1414 32.5528 49.8944L26 46.618V49C26 49.5523 25.5523 50 25 50C24.4477 50 24 49.5523 24 49V46.618L17.4472 49.8944C16.9532 50.1414 16.3526 49.9412 16.1056 49.4472C15.8586 48.9532 16.0588 48.3526 16.5528 48.1056L24 44.382V41H4C2.89543 41 2 40.1046 2 39L2 12C0.895428 12 0 11.1046 0 10V8C0 6.89543 0.895431 6 2 6H16.1338C16.2284 5.83582 16.3706 5.69665 16.5528 5.60557L24 1.88197V1C24 0.447715 24.4477 0 25 0ZM26 6V4.11803L29.7639 6H26ZM20.2361 6L24 4.11803V6H20.2361ZM2 8H25H48L48 10H46H4H2V8ZM25 39H46V12L4 12V39H25ZM9 17C9 16.4477 8.55229 16 8 16C7.44772 16 7 16.4477 7 17V34C7 34.5523 7.44772 35 8 35H12H16H19H23H25C25.5523 35 26 34.5523 26 34C26 33.4477 25.5523 33 25 33H24V21C24 20.4477 23.5523 20 23 20H19C18.4477 20 18 20.4477 18 21V33H17V25C17 24.4477 16.5523 24 16 24H12C11.4477 24 11 24.4477 11 25V33H9V17ZM20 33H22V22H20V33ZM15 26V33H13V26H15ZM34 17.083C31.1623 17.559 29 20.027 29 23C29 26.3137 31.6863 29 35 29C36.2948 29 37.4939 28.5898 38.4743 27.8924L34.2929 23.711C34.1054 23.5235 34 23.2691 34 23.0039V17.083ZM35 15C30.5817 15 27 18.5817 27 23C27 27.4183 30.5817 31 35 31C39.4183 31 43 27.4183 43 23C43 18.5817 39.4183 15 35 15ZM39.8891 26.4788C40.5886 25.4976 41 24.2968 41 23C41 20.027 38.8377 17.559 36 17.083V22.5897L39.8891 26.4788ZM29 34C29 33.4477 29.4477 33 30 33H33C33.5523 33 34 33.4477 34 34C34 34.5523 33.5523 35 33 35H30C29.4477 35 29 34.5523 29 34ZM37 33C36.4477 33 36 33.4477 36 34C36 34.5523 36.4477 35 37 35H40C40.5523 35 41 34.5523 41 34C41 33.4477 40.5523 33 40 33H37Z" fill="#365EDC"></path>
                                                                <rect opacity="0.1" x="2" y="8" width="46" height="2" fill="#ff0000"></rect>
                                                                <rect opacity="0.1" x="12" y="25" width="4" height="9" fill="#ff0000"></rect>
                                                                <rect opacity="0.1" x="19" y="21" width="4" height="12" fill="#ff0000"></rect>
                                                                <path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M35 30V39H46V12H35V16C38.866 16 42 19.134 42 23C42 26.866 38.866 30 35 30Z" fill="#ed1b24"></path>
                                                              </svg>
                                                            </i>
                                                        </div>
                
                <div className="tizers-list__item-text-wrapper color_333">
                                                      <span className="tizers-list__item-name font_17 switcher-title">Автомобиль под ключ</span>
                                                      <br/>
                                                
                                  <span className="tizers-list__item-descr font_14 color_666">Сами привозим авто и проходим сертификацию. Можно садиться и ехать</span>
                              </div>
              </div>
            </div>
                  <div className="tizers-list__item-wrapper  grid-list__item tizers-list__item-wrapper-offset">
              <div className="tizers-list__item  tizers-list__item--images-ICONS tizers-list__item--images-position-TOP tizers-list__item--column" id="bx_651765591_38">
                
                              <div className="tizers-list__item-image-wrapper tizers-list__item-image-wrapper--ICONS tizers-list__item-image-wrapper--position-TOP">
                                                          <i className="svg inline  svg-inline- fill-theme tizers-list__item-image-icon" aria-hidden="true"><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 6C7 2.68629 9.68629 0 13 0H45C47.7614 0 50 2.23858 50 5V11C50 11.5523 49.5523 12 49 12H43V45.0001C43 47.7615 40.7615 50 38.0001 50H7C3.13401 50 0 46.866 0 43V40C0 39.4477 0.447715 39 1 39H7V37C7 36.4477 7.44772 36 8 36C8.55228 36 9 36.4477 9 37V39H34.0002C34.5525 39 35.0002 39.4477 35.0002 40V45.0001C35.0002 46.6569 36.3433 48 38.0001 48C39.6569 48 41 46.6569 41 45.0001V11C41 10.4477 41.4477 10 42 10H48V5C48 3.34315 46.6569 2 45 2H13C10.7909 2 9 3.79086 9 6V7C9 7.55228 8.55228 8 8 8C7.44772 8 7 7.55228 7 7V6ZM33.9998 48C33.3721 47.1644 33.0002 46.1257 33.0002 45.0001V41H8H2V43C2 45.7614 4.23858 48 7 48H33.9998ZM26 24C26 23.4477 26.4477 23 27 23H36C36.5523 23 37 23.4477 37 24C37 24.5523 36.5523 25 36 25H27C26.4477 25 26 24.5523 26 24ZM27 18C26.4477 18 26 18.4477 26 19C26 19.5523 26.4477 20 27 20H36C36.5523 20 37 19.5523 37 19C37 18.4477 36.5523 18 36 18H27ZM26 14C26 13.4477 26.4477 13 27 13H36C36.5523 13 37 13.4477 37 14C37 14.5523 36.5523 15 36 15H27C26.4477 15 26 14.5523 26 14ZM27 28C26.4477 28 26 28.4477 26 29C26 29.5523 26.4477 30 27 30H32C32.5523 30 33 29.5523 33 29C33 28.4477 32.5523 28 32 28H27ZM16.7071 17.2929C17.0976 17.6834 17.0976 18.3166 16.7071 18.7071L10.7071 24.7071C10.3166 25.0976 9.68342 25.0976 9.29289 24.7071L6.29289 21.7071C5.90237 21.3166 5.90237 20.6834 6.29289 20.2929C6.68342 19.9024 7.31658 19.9024 7.70711 20.2929L10 22.5858L15.2929 17.2929C15.6834 16.9024 16.3166 16.9024 16.7071 17.2929ZM11.3354 9.05793C11.1185 8.98069 10.8815 8.98069 10.6646 9.05793L0.664582 12.6184C0.266114 12.7602 0 13.1375 0 13.5604V19.0748C0 25.3788 3.48849 31.1653 9.06335 34.1084L10.5331 34.8843C10.8253 35.0386 11.1747 35.0386 11.4669 34.8843L12.9367 34.1084C18.5115 31.1653 22 25.3788 22 19.0748V13.5604C22 13.1375 21.7339 12.7602 21.3354 12.6184L11.3354 9.05793ZM2 19.0748V14.2659L11 11.0615L20 14.2659V19.0748C20 24.6372 16.9219 29.7429 12.0029 32.3397L11 32.8692L9.99707 32.3397C5.07808 29.7429 2 24.6372 2 19.0748Z" fill="#365EDC"></path>
    <path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M31.0454 43H0.824786C0.824786 46.346 3.53729 49.0585 6.88333 49.0585H34.3125V48.8875C32.4266 48.3515 31.0454 46.6163 31.0454 44.5585V43Z" fill="#365EDC"></path>
    <path opacity="0.1" d="M43 2H36C33.2386 2 31 4.23858 31 7V39.9298H34.2542V45.7018L36.2881 49H39.9492L41.9831 46.9386V5.29825L43 2Z" fill="#365EDC"></path>
    <path opacity="0.1" d="M11 34V13L21 16.3158V24.3077L16.8333 30.7692L11 34Z" fill="#365EDC"></path>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M43 5C43 3.34315 44.3431 2 46 2V1H42.9995C41.7853 1.91223 41 3.3644 41 5V11C41 11.5523 41.4477 12 42 12C42.5523 12 43 11.5523 43 11V5Z" fill="#365EDC"></path>
    </svg>
    </i>																								</div>
                
                <div className="tizers-list__item-text-wrapper color_333">
                                                      <span className="tizers-list__item-name font_17 switcher-title">Надежная компания</span>
                                                      <br/>
                                                
                                  <span className="tizers-list__item-descr font_14 color_666">Многопрофильная кампания с представительством в европе</span>
                              </div>
              </div>
            </div>
                  <div className="tizers-list__item-wrapper  grid-list__item tizers-list__item-wrapper-offset">
              <div className="tizers-list__item  tizers-list__item--images-ICONS tizers-list__item--images-position-TOP tizers-list__item--column" id="bx_651765591_37">
                
                              <div className="tizers-list__item-image-wrapper tizers-list__item-image-wrapper--ICONS tizers-list__item-image-wrapper--position-TOP">
                                                          <i className="svg inline  svg-inline- fill-theme tizers-list__item-image-icon" aria-hidden="true"><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30.5" cy="9.5" r="1.5" fill="#365EDC"></circle>
    <circle cx="36.5" cy="9.5" r="1.5" fill="#365EDC"></circle>
    <circle cx="42.5" cy="9.5" r="1.5" fill="#365EDC"></circle>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M23 5C23 2.23858 25.2386 0 28 0H45C47.7614 0 50 2.23858 50 5V14C50 16.7614 47.7614 19 45 19H37.2222L33.6069 22.5596C33.3203 22.8418 32.9342 23 32.532 23C31.6859 23 31 22.3141 31 21.468V19H28C25.2386 19 23 16.7614 23 14V5ZM28 2C26.3431 2 25 3.34315 25 5V14C25 15.6569 26.3431 17 28 17H31C32.1046 17 33 17.8954 33 19V20.3505L35.819 17.5749C36.1931 17.2065 36.6971 17 37.2222 17H45C46.6569 17 48 15.6569 48 14V5C48 3.34315 46.6569 2 45 2H28ZM41 31C41 30.4477 40.5523 30 40 30H32C31.4477 30 31 30.4477 31 31C31 31.5523 31.4477 32 32 32H40C40.5523 32 41 31.5523 41 31ZM40 28C40.5523 28 41 27.5523 41 27C41 26.4477 40.5523 26 40 26H32C31.4477 26 31 26.4477 31 27C31 27.5523 31.4477 28 32 28H40ZM36 35C36 35.5523 35.5523 36 35 36H32C31.4477 36 31 35.5523 31 35C31 34.4477 31.4477 34 32 34H35C35.5523 34 36 34.4477 36 35ZM9.16666 42H9C8.44772 42 8 41.5523 8 41V39.4444C8 38.1111 8.88 36.9378 10.16 36.5644L15.0028 35.152C15.0009 35.1015 15 35.0509 15 35V33.5632C13.8811 32.5868 13.1382 31.1902 13.0174 29.6195C11.6865 28.5613 11.6658 26.4829 13 25.4175V25C13 21.6863 15.6863 19 19 19C21.9899 19 24.469 21.187 24.925 24.0485C24.9948 24.2187 25.0178 24.4076 24.9865 24.594C24.9954 24.7282 25 24.8636 25 25V25.4204C26.3992 26.4596 26.3614 28.6088 24.9811 29.6431C24.8559 31.2056 24.1144 32.5943 23 33.566V35C23 35.0509 22.9991 35.1015 22.9972 35.152L27.84 36.5644C29.12 36.9378 30 38.1111 30 39.4444V40H41.1667C41.7189 40 42.1667 40.4477 42.1667 41C42.1667 41.5523 41.7189 42 41.1667 42L29 42H9.16666ZM22.874 24C22.4299 22.2748 20.8638 21 19 21C19 22.6569 20.3431 24 22 24H22.874ZM17.0267 21.5198C16.1538 22.0159 15.4857 22.8308 15.1812 23.8063C15.43 23.7801 15.6979 23.7331 15.9651 23.6568C16.5294 23.4958 17.0143 23.2283 17.345 22.8287C17.1829 22.4164 17.0739 21.9772 17.0267 21.5198ZM18.4679 24.539C19.3725 25.4418 20.621 26 22 26H22.9091C22.9385 26 22.9692 25.9993 23.0012 25.9979C23.021 26.4099 23.2739 26.7768 23.6558 26.9404C24.142 27.1488 24.1798 27.8841 23.6424 28.1234C23.2562 28.2954 23 28.6803 23 29.1124V29.1708C23 31.2856 21.2856 33 19.1708 33H19H18.8344C16.7167 33 15 31.2833 15 29.1656V29.1114C15 28.6976 14.765 28.3229 14.3991 28.1404C13.8723 27.8776 13.8884 27.137 14.3926 26.89C14.7643 26.7078 15 26.3299 15 25.9159V25.8253C15.4638 25.8028 15.9872 25.7304 16.514 25.58C17.1652 25.3942 17.8711 25.0739 18.4679 24.539ZM21 34.7072C20.4247 34.8972 19.8098 35 19.1708 35H19H18.8344C18.1935 35 17.5768 34.8967 17 34.7058V35C17 36.1046 17.8954 37 19 37C20.1046 37 21 36.1046 21 35V34.7072ZM28 40V39.4444C28 39 27.7067 38.6089 27.28 38.4844L22.4245 37.0682C21.7237 38.2261 20.4522 39 19 39C17.5478 39 16.2763 38.2261 15.5755 37.0683L10.72 38.4844C10.2933 38.6089 10 39 10 39.4444V40H28Z" fill="#365EDC"></path>
    <path opacity="0.1" d="M12.0322 39.2879L15.7522 38.3235C16.512 38.1265 17.2995 38.4213 17.9364 38.88C18.9932 39.6411 20.5355 40.1077 22.0887 38.9081C22.7099 38.4283 23.488 38.1265 24.2478 38.3235L27.9678 39.2879C28.5756 39.4455 29 39.994 29 40.6219C29 41.383 28.383 42 27.6219 42H12.3781C11.617 42 11 41.383 11 40.6219C11 39.994 11.4244 39.4455 12.0322 39.2879Z" fill="#365EDC"></path>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M21 14H8C5.23857 14 3 16.2386 3 19V44H1H0V45V47C0 48.6569 1.34315 50 3 50H47C48.6569 50 50 48.6569 50 47V45V44H49H47V21H45V44H5V19C5 17.3431 6.34315 16 8 16H21V14ZM2 46V47C2 47.5523 2.44772 48 3 48H19.382L18.382 46H2ZM47 48C47.5523 48 48 47.5523 48 47V46H31.618L30.618 48H47ZM28.382 48H21.618L20.618 46H29.382L28.382 48Z" fill="#365EDC"></path>
    <path opacity="0.1" d="M36 8C36 5.79086 37.7909 4 40 4H48V15C48 16.6569 46.6569 18 45 18H36V8Z" fill="#365EDC"></path>
    <rect opacity="0.1" x="1" y="46" width="19" height="2" fill="#365EDC"></rect>
    <rect opacity="0.1" x="30" y="46" width="19" height="2" fill="#365EDC"></rect>
    <path opacity="0.1" d="M18.1667 21C14.8333 21 14 24.242 14 25.8629C14.7357 26.0619 16.552 25.4797 18.1667 24.242C19.1667 26.1871 22.4722 26.1331 24 25.8629L23.5833 23.0262C23.1667 22.3508 21.5 21 18.1667 21Z" fill="#365EDC"></path>
    </svg>
    </i>																								</div>
                
                <div className="tizers-list__item-text-wrapper color_333">
                                                      <span className="tizers-list__item-name font_17 switcher-title">Широкий ассортимент</span>
                                                      <br/>
                                                
                                  <span className="tizers-list__item-descr font_14 color_666">Подберем несколько вариантов по вашим требованиям</span>
                              </div>
              </div>
            </div>
                  <div className="tizers-list__item-wrapper  grid-list__item tizers-list__item-wrapper-offset">
              <div className="tizers-list__item  tizers-list__item--images-ICONS tizers-list__item--images-position-TOP tizers-list__item--column" id="bx_651765591_36">
                
                              <div className="tizers-list__item-image-wrapper tizers-list__item-image-wrapper--ICONS tizers-list__item-image-wrapper--position-TOP">
                                                          <i className="svg inline  svg-inline- fill-theme tizers-list__item-image-icon" aria-hidden="true"><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.234 22.4569C12.5094 21.8888 11.4906 21.8888 10.766 22.4569L2.76601 28.7291C2.28245 29.1082 2 29.6885 2 30.303V46C2 47.1046 2.89543 48 4 48H20C21.1046 48 22 47.1046 22 46V30.303C22 29.6885 21.7176 29.1082 21.234 28.7291L13.234 22.4569ZM9.532 20.883C10.9812 19.7468 13.0188 19.7468 14.468 20.883L22.468 27.1551C23.4351 27.9134 24 29.0741 24 30.303V46C24 48.2091 22.2091 50 20 50H4C1.79086 50 0 48.2091 0 46V30.303C0 29.0741 0.564899 27.9134 1.53201 27.1551L9.532 20.883Z" fill="#365EDC"></path>
    <circle cx="12" cy="27" r="1" fill="#365EDC"></circle>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 32C6.67157 32 6 32.6716 6 33.5C6 34.3284 6.67157 35 7.5 35C8.32843 35 9 34.3284 9 33.5C9 32.6716 8.32843 32 7.5 32ZM4 33.5C4 31.567 5.567 30 7.5 30C9.433 30 11 31.567 11 33.5C11 35.433 9.433 37 7.5 37C5.567 37 4 35.433 4 33.5ZM16.5 40C15.6716 40 15 40.6716 15 41.5C15 42.3284 15.6716 43 16.5 43C17.3284 43 18 42.3284 18 41.5C18 40.6716 17.3284 40 16.5 40ZM13 41.5C13 39.567 14.567 38 16.5 38C18.433 38 20 39.567 20 41.5C20 43.433 18.433 45 16.5 45C14.567 45 13 43.433 13 41.5ZM17.7399 32.6727C18.1114 32.264 18.0813 31.6316 17.6727 31.2601C17.264 30.8886 16.6315 30.9187 16.26 31.3273L6.26004 42.3273C5.88853 42.736 5.91865 43.3684 6.32731 43.74C6.73597 44.1115 7.36841 44.0813 7.73992 43.6727L17.7399 32.6727Z" fill="#365EDC"></path>
    <path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M14.6643 16.716C14.8056 15.7312 15.6492 15 16.6441 15H40.1256C41.1204 15 41.964 15.7312 42.1053 16.7159L45.9796 43.7159C46.1525 44.9212 45.2175 46 43.9999 46H25.9991V30.2851C25.9991 28.4621 25.1702 26.7379 23.7465 25.5993L15.6892 19.1556C15.2944 18.8398 14.8697 18.581 14.4258 18.379L14.6643 16.716Z" fill="#365EDC"></path>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M28.5 0C23.8056 0 20 3.80558 20 8.5V11H15.8955C13.415 11 11.3095 12.8185 10.9486 15.2726L10.5435 18.0282C11.2125 17.8611 11.9044 17.811 12.5871 17.8779L12.9274 15.5636C13.1439 14.0911 14.4072 13 15.8955 13H20V18C20 18.5523 20.4477 19 21 19C21.5523 19 22 18.5523 22 18V13H35V18C35 18.5523 35.4477 19 36 19C36.5523 19 37 18.5523 37 18V13H40.7841C42.275 13 43.5397 14.0949 43.7531 15.5704L47.9488 44.5704C48.2105 46.3794 46.8075 48 44.9797 48H25.6586C25.3952 48.7452 24.9888 49.4229 24.4723 50H44.9797C48.026 50 50.3644 47.299 49.9282 44.2841L45.7325 15.2841C45.3767 12.8248 43.2689 11 40.7841 11H37V8.5C37 3.80558 33.1944 0 28.5 0ZM35 11V8.5C35 4.91015 32.0899 2 28.5 2C24.9101 2 22 4.91015 22 8.5V11H35Z" fill="#365EDC"></path>
    <path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M12 49H21C22.1046 49 23 48.1046 23 47V30.7006C23 29.7529 22.5522 28.8609 21.7922 28.2948L13.7922 22.3351C13.2605 21.939 12.6302 21.7409 12 21.7409V49Z" fill="#365EDC"></path>
    </svg>
    </i>																								</div>
                
                <div className="tizers-list__item-text-wrapper color_333">
                                                      <span className="tizers-list__item-name font_17 switcher-title">Прозрачная сделка</span>
                                                      <br/>
                                                
                                  <span className="tizers-list__item-descr font_14 color_666">На основных этапах сделки и доставки автомобиля производим фото-видеофиксацию</span>
                              </div>
              </div>
            </div>
              </div>

          </div>
              </div>
                                                          </div>
                </div>
              </div>
				    </div>
	        </div>
        </div>		
      </div>
		</div>

      <div className="drag-block container FORMS" data-className="forms_drag" data-order="9">
        <div className="index-block index-block--padding-top-130 index-block--padding-bottom-130 index-block--fon">
          <section className="consult simpleform-container preload-ajax">
            <img
              src="/img/red-triangle.svg"
              data-src="/img/red-triangle.svg"
              alt=""
              className="consult__triangle consult__triangle1 lazyloaded"
            />
            <div className="consult__left">
              <div className="consult__container" style={{ width: '780px' }}>
                <div className="consult__content">
                  <div className="consult__title display2">Оставьте контакты</div>
                  <div className="consult__desc subtitle">
                    Оставьте свои контакты и мы расскажем вам, как за месяц получить во владение качественный автомобиль из Европы
                  </div>
  
                  <form
                    className="consult__form simpleform simpleform-reload"
                    id="form3"
                    encType="multipart/form-data"
                  >
                    <input type="hidden" name="component" value="profitkit:form.simple" />
                    <input type="hidden" name="component_path" value="/local/components/profitkit/form.simple" />
                    <input type="hidden" name="template" value="service_detail" />
                    <input type="hidden" name="IBLOCK_ID" value="58" />
                    <input type="hidden" name="FROM_STEP_SUCCESS" value="N" />
                    <input type="hidden" name="SERVICE" value="302" />
  
                    <fieldset className="fg">
                      <div id="name2" className="fg__input">
                        <input type="text" placeholder="Имя*" name="NAME" />
                        <span className="fg__error">Заполните обязательное поле</span>
                      </div>
                    </fieldset>
  
                    <fieldset className="fg">
                      <div id="phone2" className="fg__input">
                        <input type="tel" placeholder="Телефон*" name="PHONE" />
                        <span className="fg__error">Заполните обязательное поле</span>
                      </div>
                    </fieldset>
  
                    <button className="consult__btn mbtn mbtn-red" onClick={handleClick} type="button">
                      <span>отправить</span>
                      <svg width="21" height="29" viewBox="0 0 21 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          opacity="0.3"
                          d="M1.43962e-06 0L13.4129 14.5L0 29H7.58707L21 14.5L7.58707 0H1.43962e-06Z"
                          fill="white"
                        ></path>
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="consult__right">
              <img
                src="/img/black-triangle.svg"
                data-src="/img/black-triangle.svg"
                alt=""
                className="consult__triangle consult__triangle2 lazyloaded"
              />
              <div className="consult__img">
                <img
                  className="lazyloaded"
                  src="/img/consult2.webp"
                  data-src="/img/consult2.webp"
                  alt=""
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default AboutPage
