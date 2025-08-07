/* eslint-disable @next/next/no-img-element */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier

// import styles from '@/styles/footer/index.module.scss'
// import FooterLogo from './FooterLogo'
// import OnlineStoreContent from './OnlineStoreContent'
// import CompanyContent from './CompanyContent'
// import MarkerSvg from '@/components/elements/MarkerSvg/MarkerSvg'
// import PhoneSvg from '@/components/elements/PhoneSvg/PhoneSvg'
// import MailSvg from '@/components/elements/MailSvg/MailSvg'
import { useMediaQuery } from '@/hooks/useMediaQuery'
// import Accordion from '@/components/elements/Accordion/Accordion'
import '@/styles/footer/footer.css';
import '@/styles/footer/custom.css';
import '@/styles/footer/styles.css';
import '@/styles/line-block.css';
import '@/styles/header.css';
import '@/styles/responsive.css';
// import '@/styles/styles.css';
import '@/styles/footer/width-2.css';
import Link from 'next/link';
import Num from '@/components/elements/Num/Num';

const Footer = () => {
  const isMedia750 = useMediaQuery(750)
  const isMedia500 = useMediaQuery(500)

  return (
    // <footer className={styles.footer}>
    //   <div className={styles.footer__container}>
    //     <div className={styles.footer__top}>
    //       {!isMedia750 && <FooterLogo />}
    //       <div className={styles.footer__top__inner}>
    //         <div className={styles.footer__top__item}>
    //           {!isMedia500 && (
    //             <>
    //               <h3 className={styles.footer__top__item__title}>Авто</h3>
    //               <OnlineStoreContent />
    //             </>
    //           )}
    //           {isMedia500 && (
    //             <Accordion
    //               title="Авто"
    //               titleclassName={styles.footer__top__item__title}
    //               arrowOpenclassName={styles.open}
    //             >
    //               <OnlineStoreContent />
    //               <div style={{ height: 17 }} />
    //             </Accordion>
    //           )}
    //         </div>
    //         <div className={styles.footer__top__item}>
    //           {!isMedia500 && (
    //             <>
    //               <h3 className={styles.footer__top__item__title}>Компания</h3>
    //               <CompanyContent />
    //             </>
    //           )}
    //           {isMedia500 && (
    //             <Accordion
    //               title="Компания"
    //               titleclassName={styles.footer__top__item__title}
    //               arrowOpenclassName={styles.open}
    //             >
    //               <CompanyContent />
    //               <div style={{ height: 17 }} />
    //             </Accordion>
    //           )}
    //         </div>
    //       </div>
    //       <div className={styles.footer__top__item}>
    //         <h3 className={styles.footer__top__item__title}>Контакты</h3>
    //         <ul
    //           className={`${styles.footer__top__item__list} ${styles.footer__top__item__contacts}`}
    //         >
    //           <li className={styles.footer__top__item__list__item}>
    //             <a
    //               href="https://yandex.ru/maps/-/CHafFJnl"
    //               className={styles.footer__top__item__list__item__linkd}
    //               target="_blank"
    //               rel="noopener noreferrer"
    //             >
    //               <span>Наш адрес:</span>
    //               <span>
    //                 Самарская обл. Тольятти. Южное шоссе, 24. 445004. Офис 202
    //               </span>
    //               <span>
    //                 <MarkerSvg />
    //               </span>
    //             </a>
    //             <a
    //               href="https://yandex.ru/maps/-/CHB-7N4M"
    //               className={styles.footer__top__item__list__item__linkd}
    //               target="_blank"
    //               rel="noopener noreferrer"
    //             >
    //               <span>Партнеры:</span>
    //               <span>
    //                 Мурманская обл. Мурманск. Книповича, 23. 183025. Офис 119
    //               </span>
    //               <span>
    //                 <MarkerSvg />
    //               </span>
    //             </a>
    //           </li>
    //           <li className={styles.footer__top__item__list__item}>
    //             <a
    //               href="tel:+79106939076"
    //               className={styles.footer__top__item__list__item__linkd}
    //             >
    //               <span>Наш контактный телефон:</span>
    //               <span>+7 (910) 693-90-76</span>
    //               <span>
    //                 <PhoneSvg />
    //               </span>
    //             </a>
    //           </li>
    //           <li className={styles.footer__top__item__list__item}>
    //             <a
    //               href="mailto:myeurocar@mail.ru"
    //               className={styles.footer__top__item__list__item__linkd}
    //             >
    //               <span>E-mail:</span>
    //               <span>myeurocar@mail.ru</span>
    //               <span>
    //                 <MailSvg />
    //               </span>
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //     <div className={styles.footer__bottom}>
    //       <div className={styles.footer__bottom__block}>
    //         <div className={styles.footer__bottom__block__left}>
    //           <h3 className={styles.footer__bottom__block__title}>
    //             Мы принимаем к оплате:
    //           </h3>
    //           <ul className={styles.footer__bottom__block__pay}>
    //             {/* <li className={styles.footer__bottom__block__pay__item}>
    //               <img src="/img/pay.png" alt="apple-pay" />
    //             </li> */}
    //             <li className={styles.footer__bottom__block__pay__item}>
    //               <img src="/img/pay/mir-svgrepo-com.svg" alt="master-card" />
    //             </li>
    //             <li className={styles.footer__bottom__block__pay__item}>
    //               <img
    //                 src="/img/pay/mastercard-svgrepo-com.svg"
    //                 alt="master-card"
    //               />
    //             </li>
    //             <li className={styles.footer__bottom__block__pay__item}>
    //               <img src="/img/pay/visa-svgrepo-com.svg" alt="visa" />
    //             </li>
    //           </ul>
    //         </div>
    //         <div className={styles.footer__bottom__block__right}>
    //           <h3 className={styles.footer__bottom__block__title}>
    //             Мы в соцсети:
    //           </h3>
    //           <ul className={styles.footer__bottom__block__social}>
    //             <li className={styles.footer__bottom__block__social__item}>
    //               <a
    //                 href="https://t.me/+LCUHJvj1n2swZDgy"
    //                 target="_blank"
    //                 className={styles.footer__bottom__block__social__item_vk}
    //               >
    //                 <img src="/img/telegram.png" alt="visa" />
    //               </a>
    //             </li>
    //             {/* <li className={styles.footer__bottom__block__social__item}>
    //               <a
    //                 href="#"
    //                 className={styles.footer__bottom__block__social__item_fb}
    //               />
    //             </li>
    //             <li className={styles.footer__bottom__block__social__item}>
    //               <a
    //                 href="#"
    //                 className={styles.footer__bottom__block__social__item_inst}
    //               />
    //             </li>
    //             <li className={styles.footer__bottom__block__social__item}>
    //               <a
    //                 href="#"
    //                 className={styles.footer__bottom__block__social__item_ytb}
    //               />
    //             </li> */}
    //           </ul>
    //         </div>
    //       </div>
    //       {isMedia750 && <FooterLogo />}
    //       <div className={styles.footer__bottom__block}>
    //         <p className={styles.footer__bottom__block__copyright}>
    //           © ООО «ТЛТТРАНС» 2019. Партнер ООО «АВТО-С»
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </footer>

    <footer id="footer" className="footer-4 footer footer--color-dark">
      <div className="maxwidth-theme">
        <div className="footer__info footer__info--row footer__info--row-paddings js-check-hide">
          <div className="line-block line-block--48 line-block--align-normal">
            <div className="footer__info--part-left flex-grow-1 line-block__item flex-50-1200">
              <div className="line-block line-block--48 line-block--align-normal">
                <div className="footer__phone footer__info-item line-block__item flex-100-767 check-visible " data-ajax-load-block="FOOTER_TOGGLE_PHONE" data-ajax-check-visible="FOOTER_TOGGLE_SUBSCRIBE,FOOTER_TOGGLE_PHONE,FOOTER_TOGGLE_EMAIL,FOOTER_TOGGLE_ADDRESS,FOOTER_TOGGLE_SOCIAL">
                  <div className="icon-block--with_icon ">
                    <div className="phones">
                      <div className="phones__phones-wrapper">
                        <div className="phones__inner phones__inner--big fill-theme-parent">
                          {/* <a href="tel:+78122236214">
                            <span className="icon-block__only-icon banner-light-icon-fill menu-light-icon-fill fill-theme-target">
                              <i className="svg inline  svg-inline-" aria-hidden="true"><svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.63104 7.97841C6.80463 8.37048 7.0041 8.78717 7.15518 9.07225C7.27009 9.28907 7.49877 9.67951 7.75313 10.0735C7.76214 10.0675 7.77119 10.0616 7.78029 10.0557C8.42453 9.63686 9.0857 9.68158 9.33213 9.70774C9.65095 9.7416 9.94005 9.82627 10.1562 9.90146C10.5996 10.0556 11.0572 10.2844 11.4507 10.5088C11.8534 10.7384 12.2607 11.0047 12.6067 11.2698C12.7791 11.4018 12.9587 11.5506 13.1228 11.7095C13.2598 11.8422 13.4996 12.0889 13.6819 12.4208C13.9567 12.9214 13.9912 13.4324 13.9984 13.6733C14.0076 13.9837 13.9774 14.2994 13.9216 14.5917C13.8662 14.8818 13.7732 15.2138 13.6215 15.5388C13.4853 15.8308 13.2157 16.3046 12.7088 16.6593C12.2763 16.9621 12.101 17.0614 11.5704 17.3623C11.5097 17.3967 11.4445 17.4337 11.3736 17.4739C10.0199 18.2431 8.63271 17.9822 7.88102 17.8407C7.83467 17.832 7.79075 17.8237 7.74939 17.8162C6.75715 17.6353 5.7137 16.9402 4.80916 16.0871C3.83349 15.1669 2.7972 13.855 1.8574 12.1001C-0.0332021 8.56968 -0.11428 5.48344 0.0632851 4.44905C0.155366 3.91264 0.377274 3.31038 0.67849 2.76835C0.975733 2.23348 1.45254 1.57218 2.16387 1.10241C2.86272 0.640891 3.08665 0.498187 3.5503 0.267086C4.05424 0.0159067 4.54851 -0.00825558 4.84873 0.00182873C5.18399 0.01309 5.50575 0.0758517 5.78987 0.161581C6.29082 0.312738 7.02383 0.643641 7.53773 1.30319C7.84738 1.70061 7.96266 2.13768 8.0032 2.29536C8.0629 2.52757 8.10186 2.76842 8.12854 2.98699C8.18252 3.42919 8.20461 3.93488 8.19668 4.4186C8.1889 4.89393 8.15099 5.42764 8.05633 5.9073C8.00998 6.14217 7.93607 6.43773 7.80765 6.73085C7.7078 6.95878 7.43069 7.53172 6.78987 7.89289C6.7363 7.92309 6.68325 7.95156 6.63104 7.97841ZM4.36756 7.68433C4.55311 8.29107 5.08198 9.4331 5.38688 10.0084C5.69177 10.5837 6.4713 11.8462 6.90539 12.2852C7.33947 12.7242 7.68815 12.619 7.8981 12.5196C7.99603 12.4732 8.11572 12.3629 8.26158 12.2285C8.42842 12.0748 8.62948 11.8895 8.87134 11.7322C9.32463 11.4376 11.633 12.8464 11.9276 13.3829C12.1 13.6969 11.9533 14.7465 11.561 15.0211C11.208 15.2682 11.1075 15.3251 10.5781 15.6255C10.5193 15.6588 10.4551 15.6952 10.3847 15.7353C9.68103 16.1351 8.95879 16.0037 8.10853 15.8487C7.25828 15.6936 5.31836 14.3246 3.62164 11.1563C1.92491 7.98792 1.93885 5.3504 2.03552 4.78725C2.13219 4.22409 2.57448 3.22841 3.267 2.77107C3.95952 2.31373 4.09679 2.22961 4.44334 2.05688C4.78989 1.88414 5.64012 2.12285 5.95894 2.53204C6.27777 2.94122 6.32266 5.86013 5.80696 6.15079C5.54379 6.29912 5.29676 6.38092 5.09355 6.44822C4.89855 6.5128 4.74389 6.56401 4.65399 6.64783C4.65164 6.65003 4.64927 6.65224 4.64688 6.65446C4.4631 6.8257 4.18439 7.08538 4.36756 7.68433Z" fill="#888888"></path>
                              </svg>
                              </i>
                            </span>
                          </a> */}
                          <span className="icon-block__icon banner-light-icon-fill menu-light-icon-fill">
                          <i className="svg inline  svg-inline-" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.9601 8.66625C12.8134 8.66625 12.6601 8.61959 12.5134 8.58625C12.2164 8.5208 11.9245 8.43391 11.6401 8.32625C11.3308 8.21374 10.9908 8.21958 10.6856 8.34266C10.3804 8.46573 10.1315 8.69734 9.98673 8.99292L9.84007 9.29292C9.19074 8.9317 8.59406 8.48307 8.06673 7.95959C7.54325 7.43226 7.09461 6.83558 6.7334 6.18625L7.0134 5.99959C7.30898 5.85486 7.54059 5.60594 7.66366 5.30071C7.78674 4.99549 7.79258 4.65553 7.68007 4.34625C7.57422 4.0612 7.48736 3.76945 7.42007 3.47292C7.38673 3.32625 7.36007 3.17292 7.34007 3.01959C7.25911 2.55 7.01315 2.12475 6.64648 1.82041C6.27981 1.51608 5.81653 1.35266 5.34007 1.35959H3.34007C3.05275 1.35689 2.76823 1.41613 2.50587 1.53327C2.24351 1.65042 2.00947 1.82272 1.81969 2.03844C1.6299 2.25417 1.48882 2.50825 1.40606 2.7834C1.32329 3.05854 1.30079 3.34829 1.34007 3.63292C1.69523 6.42584 2.97075 9.02084 4.96517 11.008C6.95958 12.9952 9.55921 14.2613 12.3534 14.6063H12.6067C13.0983 14.607 13.573 14.4266 13.9401 14.0996C14.151 13.9109 14.3195 13.6797 14.4344 13.4211C14.5493 13.1626 14.608 12.8825 14.6067 12.5996V10.5996C14.5986 10.1365 14.4299 9.69062 14.1296 9.33803C13.8293 8.98544 13.4159 8.748 12.9601 8.66625ZM13.2934 12.6663C13.2933 12.7609 13.273 12.8545 13.2339 12.9407C13.1948 13.0269 13.1378 13.1038 13.0667 13.1663C12.9925 13.2309 12.9054 13.2792 12.8112 13.3079C12.717 13.3366 12.6178 13.3452 12.5201 13.3329C10.0233 13.0128 7.70422 11.8706 5.92854 10.0864C4.15286 8.30232 3.02167 5.97781 2.7134 3.47959C2.70279 3.38193 2.71209 3.28314 2.74074 3.18918C2.76938 3.09522 2.81678 3.00804 2.88007 2.93292C2.94254 2.86181 3.01944 2.80481 3.10565 2.76573C3.19186 2.72665 3.28541 2.70637 3.38007 2.70625H5.38007C5.5351 2.7028 5.68648 2.75351 5.80816 2.84963C5.92984 2.94576 6.01421 3.0813 6.04673 3.23292C6.0734 3.41514 6.10673 3.59514 6.14673 3.77292C6.22375 4.12435 6.32624 4.46971 6.4534 4.80625L5.52007 5.23959C5.44026 5.2762 5.36848 5.32822 5.30884 5.39265C5.2492 5.45708 5.20287 5.53266 5.17251 5.61505C5.14216 5.69744 5.12838 5.78501 5.13197 5.87273C5.13555 5.96046 5.15643 6.04662 5.1934 6.12625C6.15287 8.18142 7.8049 9.83345 9.86007 10.7929C10.0224 10.8596 10.2044 10.8596 10.3667 10.7929C10.4499 10.7632 10.5263 10.7172 10.5915 10.6577C10.6567 10.5982 10.7095 10.5263 10.7467 10.4463L11.1601 9.51292C11.5047 9.63617 11.8565 9.73858 12.2134 9.81959C12.3912 9.85959 12.5712 9.89292 12.7534 9.91959C12.905 9.95211 13.0406 10.0365 13.1367 10.1582C13.2328 10.2798 13.2835 10.4312 13.2801 10.5863L13.2934 12.6663Z" fill="#7C7C7C"></path>
                          </svg>
                          </i>
                          </span>
                          <div className="phones__phone-link phones__phone-first dark_link banner-light-text menu-light-text icon-block__name qwe"><Num/></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>                                                           
                <div className="footer--nowrap footer--mt-3 footer__info-item line-block__item flex-100-767 check-visible " data-ajax-load-block="FOOTER_TOGGLE_EMAIL" data-ajax-check-visible="FOOTER_TOGGLE_SUBSCRIBE,FOOTER_TOGGLE_PHONE,FOOTER_TOGGLE_EMAIL,FOOTER_TOGGLE_ADDRESS,FOOTER_TOGGLE_SOCIAL">
                  
                                          <div className="icon-block--with_icon">				
                  <div className="footer__email font_14">
                                <i className="svg inline  svg-inline-email" aria-hidden="true"><svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.6663 0.666992H2.33301C1.80257 0.666992 1.29387 0.877706 0.918794 1.25278C0.543722 1.62785 0.333008 2.13656 0.333008 2.66699V9.33366C0.333008 9.86409 0.543722 10.3728 0.918794 10.7479C1.29387 11.1229 1.80257 11.3337 2.33301 11.3337H11.6663C12.1968 11.3337 12.7055 11.1229 13.0806 10.7479C13.4556 10.3728 13.6663 9.86409 13.6663 9.33366V2.66699C13.6663 2.13656 13.4556 1.62785 13.0806 1.25278C12.7055 0.877706 12.1968 0.666992 11.6663 0.666992ZM11.393 2.00033L7.47301 5.92033C7.41103 5.98281 7.3373 6.03241 7.25606 6.06625C7.17482 6.1001 7.08768 6.11752 6.99967 6.11752C6.91167 6.11752 6.82453 6.1001 6.74329 6.06625C6.66205 6.03241 6.58832 5.98281 6.52634 5.92033L2.60634 2.00033H11.393ZM12.333 9.33366C12.333 9.51047 12.2628 9.68004 12.1377 9.80506C12.0127 9.93009 11.8432 10.0003 11.6663 10.0003H2.33301C2.1562 10.0003 1.98663 9.93009 1.8616 9.80506C1.73658 9.68004 1.66634 9.51047 1.66634 9.33366V2.94033L5.58634 6.86033C5.96134 7.23486 6.46967 7.44523 6.99967 7.44523C7.52968 7.44523 8.03801 7.23486 8.41301 6.86033L12.333 2.94033V9.33366Z" fill="#7C7C7C"></path>
          </svg>
          </i>										<div>
                                <div>
                        <a className="dark_link qwe" href="mailto:importeurocar@yandex.com">importeurocar@yandex.com</a>
                      </div>
                              </div>
                  </div>
                  </div>
                      
                  
                  
                </div>                                                        
                <div className="footer__address footer--mt-3 footer__info-item line-block__item flex-100-767 check-visible " data-ajax-load-block="FOOTER_TOGGLE_ADDRESS" data-ajax-check-visible="FOOTER_TOGGLE_SUBSCRIBE,FOOTER_TOGGLE_PHONE,FOOTER_TOGGLE_EMAIL,FOOTER_TOGGLE_ADDRESS,FOOTER_TOGGLE_SOCIAL">
                  
                                          <div className="icon-block--with_icon">					
                  
                  <div className="address">
                                <span className="icon-block__icon icon-block__icon--top banner-light-icon-fill menu-light-icon-fill">
                        <i className="svg inline  svg-inline-address" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.9996 2.98693C10.9388 1.92607 9.49992 1.33008 7.99963 1.33008C6.49934 1.33008 5.06049 1.92607 3.99963 2.98693C2.93876 4.0478 2.34277 5.48664 2.34277 6.98693C2.34277 8.48722 2.93876 9.92607 3.99963 10.9869L7.51296 14.5069C7.57494 14.5694 7.64867 14.619 7.72991 14.6529C7.81115 14.6867 7.89829 14.7041 7.98629 14.7041C8.0743 14.7041 8.16144 14.6867 8.24268 14.6529C8.32392 14.619 8.39765 14.5694 8.45963 14.5069L11.9996 10.9536C13.0561 9.89715 13.6496 8.4643 13.6496 6.97027C13.6496 5.47623 13.0561 4.04338 11.9996 2.98693ZM11.0463 10.0003L7.99963 13.0603L4.95296 10.0003C4.35106 9.39781 3.94128 8.63043 3.77542 7.79513C3.60957 6.95982 3.69509 6.0941 4.02116 5.30739C4.34724 4.52068 4.89924 3.8483 5.60738 3.37525C6.31552 2.9022 7.14802 2.64972 7.99963 2.64972C8.85124 2.64972 9.68373 2.9022 10.3919 3.37525C11.1 3.8483 11.652 4.52068 11.9781 5.30739C12.3042 6.0941 12.3897 6.95982 12.2238 7.79513C12.058 8.63043 11.6482 9.39781 11.0463 10.0003ZM5.99963 4.94027C5.46144 5.48011 5.15922 6.21131 5.15922 6.9736C5.15922 7.73589 5.46144 8.46708 5.99963 9.00693C6.39947 9.40746 6.90869 9.68099 7.46339 9.7932C8.0181 9.90542 8.5936 9.85132 9.11768 9.6377C9.64176 9.42408 10.0911 9.06045 10.4093 8.59243C10.7275 8.12441 10.9004 7.57285 10.9063 7.00693C10.9093 6.62907 10.8365 6.25444 10.6922 5.90519C10.548 5.55594 10.3351 5.23917 10.0663 4.9736C9.80208 4.70332 9.48701 4.48796 9.13924 4.33991C8.79147 4.19186 8.41785 4.11405 8.0399 4.11095C7.66193 4.10785 7.28709 4.17953 6.93694 4.32186C6.58679 4.46419 6.26824 4.67435 5.99963 4.94027ZM9.12629 8.06027C8.87366 8.31676 8.53977 8.47754 8.18171 8.5151C7.82366 8.55267 7.46367 8.46469 7.1633 8.26622C6.86293 8.06774 6.64083 7.77109 6.53497 7.42699C6.42911 7.08288 6.44606 6.71269 6.58293 6.3797C6.71981 6.04671 6.96809 5.77161 7.28535 5.60142C7.60261 5.43124 7.96913 5.37654 8.32225 5.44668C8.67537 5.51682 8.99317 5.70744 9.2213 5.98595C9.44943 6.26447 9.57374 6.61358 9.57296 6.9736C9.56326 7.38511 9.39062 7.77595 9.09296 8.06027H9.12629Z" fill="#7C7C7C"></path>
          </svg>
          </i>						</span>
                              <div className="address__text font_15  ">
                              460507, Оренбургская область, поселок Пригородный, пр-д Новоселов, д. 9</div>
                  </div>
                  </div>
                      
                  
                  
                </div>
			        </div>
            </div>
            <div className="footer__info--part-right line-block__item flex-100-1200">
			      </div>
          </div>
          <div className="footer__socials">
                <ul className="footer__socials-list">
                    <li className="footer__socials-item">
                        <a href="https://t.me/+LCUHJvj1n2swZDgy" target='_blank' className="footer__socials-link">
                          <img src='/img/telegram.png' style={{ width: '20px' }} alt="Instagram"></img>
                          <span>мы в Telegram</span>
                        </a>
                    </li>

                    <li className="footer__socials-item">
                        <a href="https://www.instagram.com/import_euro_car?igsh=dWhvcm15aW8zazVk&utm_source=qr" target='_blank' className="footer__socials-link">
                            <img src='/img/instagram-1-svgrepo-com.svg' style={{ width: '20px' }} alt="Instagram"></img>
                            <span>мы в Instagram</span>
                        </a>
                    </li>

                    <li className="footer__socials-item">
                        <a href="https://www.tiktok.com/@import_euro_car?_t=ZM-8vYPNyBb3ix&_r=1" target='_blank' className="footer__socials-link">
                          <img src='/img/tiktok-svgrepo-com.svg' style={{ width: '20px' }} alt="Instagram"></img>
                          <span>мы в TikTok</span>
                        </a>
                    </li>
                </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom-part">
        <div className="footer__bottom-part-inner footer__bottom-part-inner--big-padding js-check-padding">
            <div className="maxwidth-theme">
                <div className="footer__bottom-part-items-wrapper">
                    <div className="footer__part-item">
                        <div className="footer__copy font_13 color_999">
                            <p>ООО "Велес Авто" 460507, Оренбургская область, поселок Пригородный, пр-д Новоселов, д. 9</p>
                            <p>ООО "Ива Авто" 620146, Свердловская область, г Екатеринбург, Московская ул, д. 194, кв. 162</p>
                            {/* <p>Тел.: <Num/></p> */}
                            <p>ОГРН 1185658012869 ИНН / КПП 5638074027 / 563801001</p>
                            <p>ОГРН 1226600043251 ИНН / КПП 6678121684 / 667101001</p>
                              Import Euro Car © 2018
                          </div>
                    </div>
                    <div className="footer__part-item">
                        <div className="footer__license font_13">
                          <Link className="color_999 dark_link" href="/privacypolicy" passHref legacyBehavior>Политика конфиденциальности</Link>
                        </div>
                    </div>                               
					{/* <div className="footer__part-item fill-theme-parent-all color-theme-parent-all hidden" data-ajax-load-block="FOOTER_TOGGLE_EYED" data-ajax-check-visible="">
						
						
						
					</div>                                       
					<div className="footer__part-item footer__part-item-sitemap fill-theme-parent-all color-theme-parent-all font_13 hidden" data-ajax-load-block="FOOTER_TOGGLE_SITEMAP" data-ajax-check-visible="">
						
						
						
					</div>                           
					<div className="footer__part-item footer__part-item--subscribe check-visible hidden" data-ajax-load-block="FOOTER_TOGGLE_SUBSCRIBE" data-ajax-check-visible="FOOTER_TOGGLE_SUBSCRIBE,FOOTER_TOGGLE_PHONE,FOOTER_TOGGLE_EMAIL,FOOTER_TOGGLE_ADDRESS,FOOTER_TOGGLE_SOCIAL">
						
						
						
					</div>                               
					<div className="footer__pays footer__part-item hidden" data-ajax-load-block="FOOTER_TOGGLE_PAY_SYSTEMS" data-ajax-check-visible="">
						
						
						
					</div>                                 
					<div className="footer__lang footer__part-item hidden" data-ajax-load-block="FOOTER_TOGGLE_LANG" data-ajax-check-visible="">
						
						
						
					</div>
                    <div id="bx-composite-banner" className="footer__part-item"></div>
					<div className="footer__developer footer__part-item font_12 color_999 hidden" data-ajax-load-block="FOOTER_TOGGLE_DEVELOPER" data-ajax-check-visible="">
						
						
						
					</div> */}
			    </div>
            </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
