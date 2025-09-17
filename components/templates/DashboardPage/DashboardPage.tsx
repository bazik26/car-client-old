/* eslint-disable prettier/prettier */

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getBestsellersOrNewPartsFx, getSoldCarsFx } from '@/app/api/boilerParts'
import BrandsSlider from '@/components/modules/DashboardPage/BrandsSlider'
import { IBoilerParts } from '@/types/boilerparts'
import styles from '@/styles/dashboard/index.module.scss'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import SoldCarsSlider from '@/components/modules/DashboardPage/SoldCarsSlider'
import { $shoppingCart } from '@/context/shopping-cart'
import { AnimatePresence, motion } from 'framer-motion'
import CartAlert from '@/components/modules/DashboardPage/CartAlert'
import Image from 'next/image'
import '@/styles/dashboard/custom.css';
import '@/styles/dashboard/styleconsalt.css';
import Num from '@/components/elements/Num/Num'

const DashboardPage = () => {
  const [newParts, setNewParts] = useState<IBoilerParts>({} as IBoilerParts)
  const [bestsellers, setBestsellers] = useState<IBoilerParts>(
    {} as IBoilerParts
  )
  const [soldCars, setSoldCars] = useState<any[]>([])
  const [spinner, setSpinner] = useState(false)
  const shoppingCart = useStore($shoppingCart)
  const [showAlert, setShowAlert] = useState(!!shoppingCart.length)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    loadBoilerParts()
  }, [])

  useEffect(() => {
    if (shoppingCart.length) {
      setShowAlert(true)
      return
    }

    setShowAlert(false)
  }, [shoppingCart.length])

  const loadBoilerParts = async () => {
    try {
      setSpinner(true)
      const bestsellers = await getBestsellersOrNewPartsFx(
        '/cars'
      )
      const newParts = await getBestsellersOrNewPartsFx('/cars')
      const soldCarsData = await getSoldCarsFx('/cars/sold?limit=15')

      console.log('🚨🚨🚨 DASHBOARD PAGE LOADED 🚨🚨🚨')
      console.log('📋 DashboardPage soldCarsData:', soldCarsData)
      console.log('📊 DashboardPage soldCarsData length:', soldCarsData.length)
      console.log('🔍 DashboardPage soldCarsData details:', soldCarsData.map((car: any) => `${car.name} (sale: ${car.sale})`))
      console.log('🚨🚨🚨 END DASHBOARD PAGE 🚨🚨🚨')

      setBestsellers(bestsellers)
      setNewParts(newParts)
      setSoldCars(soldCarsData)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  const closeAlert = () => setShowAlert(false)

  const advantages = [
    {
      title: "Отлаженная логистика",
      description: "Доставляем автомобили с помощью своих автовозов и во все регионы России",
    },
    {
      title: "Широкий выбор",
      description: "Комплектации по вашим требованиям и эксклюзив под заказ.",
    },
    {
      title: "Фиксированная цена",
      description: "Цена, указанная в договоре, является фиксированной и не может быть изменена.",
    },
    {
      title: "Кредит, лизинг и trade-in",
      description: "Готовы предложить различные финансовые инструменты при покупке автомобиля",
    },
    {
      title: "Доставляем быстрее дилеров",
      description: "Срок поставки в среднем занимает 7-14 дней. Иногда доходит до 30 дней, зависит от вашего региона, но больше не бывает",
    },
    {
      title: "Надежное юрлицо",
      description: "Многопрофильная компания с представительством в Европе, США и Корее",
    },
  ];

  const stages = [
    {
      title: "Получаем вводные данные",
      description: "Для начала подбора нужна марка, модель автомобиля и пожелания по комплектации"
    },
    {
      title: "Подбираем варианты и отправляем клиенту",
      description: "Проверяем все предложения поставщиков и выбираем от двух до четырех вариантов"
    },
    {
      title: "Согласовываем вариант",
      description: "Клиент выбирает один вариант, мы запрашиваем информацию о техническом состоянии автомобиля"
    },
    {
      title: "Подписываем договор",
      description: "В договоре фиксируем стоимость автомобиля, форму оплаты, техническое состояние и сроки поставки"
    },
    {
      title: "Доставляем автомобиль",
      description: "Привозим автомобиль, проходим растаможку, сертификацию. Выдаем клиенту автомобиль с ЭПТС"
    }
  ];

  const recommendations = [
    { title: "Менеджер ", src: "/video/IMG_0461.MP4", url: "https://t.me/+8tXb1bnEPe04MDhi", poster: "/img/logo16.9.png" },
    { title: "Менеджер ", src: "/video/IMG_0705.MP4", url: "https://t.me/+8tXb1bnEPe04MDhi", poster: "/img/logo16.9.png" },
    { title: "Менеджер ", src: "/video/IMG_0586.MP4", url: "https://t.me/+8tXb1bnEPe04MDhi", poster: "/img/logo16.9.png" },
    { title: "Менеджер ", src: "/video/IMG_0805.MP4", url: "https://t.me/+8tXb1bnEPe04MDhi", poster: "/img/logo16.9.png" },
    { title: "Менеджер ", src: "/video/IMG_0845.MP4", url: "https://t.me/+8tXb1bnEPe04MDhi", poster: "/img/logo16.9.png" },
    { title: "Менеджер ", src: "/video/IMG_1472.MP4", url: "https://t.me/+8tXb1bnEPe04MDhi", poster: "/img/logo16.9.png" },
  ];

  const handleClick = () => {
    // 1. Получаем значения из нужных инпутов по name
    const brand = (document.querySelector('input[name="brand"]') as HTMLInputElement)?.value
    const model = (document.querySelector('input[name="model"]') as HTMLInputElement)?.value
    const generation = (document.querySelector('input[name="generation"]') as HTMLTextAreaElement)?.value
  
    // 2. Можно передать эти данные дальше или сохранить
    console.log({ brand, model, generation }) // или сохранить в localStorage, state и т.д.
    // localStorage.setItem('formData', JSON.stringify({ name, email, message }))
  
    // 3. Показываем форму (твоя логика)
    const form = document.querySelector('.formbord') as HTMLElement
  
    if (form) {
      if (window.innerWidth < 560) {
        form.style.right = '0px'
      } else {
        form.style.display = 'flex'
        form.style.right = '0px'
      }
    }
  }

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    generation: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 560)
    }

    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  const [height, setHeight] = useState(260)

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerWidth <= 560 ? 200 : 260)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${styles.dashboard__alert} ${darkModeClass}`}
            >
              <CartAlert
                count={shoppingCart.reduce(
                  (defaultCount, item) => defaultCount + item.count,
                  0
                )}
                closeAlert={closeAlert}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <Image
          src={isMobile ? '/img/mobile_banner.jpg' : '/img/main_banner.jpg'}
          alt="mainimg"
          className={styles.dashboard__mainimg}
          width={800}
          height={600}
        />
        <section className="props">
          <div className="container-new">
            <div className="props__inner">
              <div className="props__item">
                <div className="props__title">Успешно поставляем</div>
                <div className="props__info">
                  <span className="props__num">&gt; 50</span>
                  <span className="props__desc">авто в месяц</span>
                </div>
              </div>
              <div className="props__item">
                <div className="props__title">Довольных клиентов</div>
                <div className="props__info">
                  <span className="props__num">&gt; 1359</span>
                </div>
              </div>
              <div className="props__item">
                <div className="props__title">Стоимость авто под ключ</div>
                <div className="props__info">
                  <span className="props__num">
                    <span>от</span> 1 000 000 <span>₽</span>
                  </span>
                </div>
              </div>
              <div className="props__item">
                <div className="props__title">Компания на рынке с</div>
                <div className="props__info">
                  <span className="props__num">
                    2022 <span>г</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="case">
          <div className="container-new">
            <div className="case__top">
              <div className="case__title display2">Кейсы</div>
              <div className="case__desc subtitle">Уже 1500 клиентов получили свой автомобиль</div>
            </div>
            <div className="case__slider">
              <SoldCarsSlider items={soldCars} spinner={spinner} />
            </div>
          </div>
        </section>
        <section className="consult preload-ajax simpleform-container">
          <img
            src="/img/red-triangle.svg"
            data-src="/img/red-triangle.svg"
            alt=""
            className="consult__triangle consult__triangle1 lazyloaded"
          />
          <div className="consult__left">
            <div className="consult__container test" style={{ width: "759.72px" }}>
              <div className="consult__content consult__content1">
                <div className="consult__title display2">
                  Узнайте, сколько будет стоить ваш автомобиль
                </div>
                <div className="consult__desc subtitle">Выберите комплектацию</div>
                <form
                  className="consult__form simpleform simpleform-reload"
                  id="form1"
                  action="#"
                  encType="multipart/form-data"
                >
                  <input type="hidden" name="component" value="profitkit:form.simple" />
                  <input type="hidden" name="component_path" value="/local/components/profitkit/form.simple" />
                  <input type="hidden" name="template" value="service_detail_car" />
                  <input type="hidden" name="IBLOCK_ID" value="59" />
                  <input type="hidden" name="FROM_STEP_1" value="Y" />
                  <input type="hidden" name="FROM_STEP_2" value="N" />
                  <fieldset className="fg">
                    <div id="name" className="fg__input">
                      <input type="text" placeholder="Марка*" name="brand" value={formData.brand} onChange={handleChange}/>
                      <span className="fg__error">Заполните обязательное поле</span>
                    </div>
                  </fieldset>
                  <fieldset className="fg">
                    <div id="name" className="fg__input">
                      <input type="text" placeholder="Модель*" name="model" value={formData.model} onChange={handleChange} />
                      <span className="fg__error">Заполните обязательное поле</span>
                    </div>
                  </fieldset>
                  <fieldset className="fg">
                    <div id="name" className="fg__input">
                      <input type="text" placeholder="Поколение*" name="generation" value={formData.generation} onChange={handleChange} />
                      <span className="fg__error">Заполните обязательное поле</span>
                    </div>
                  </fieldset>
                  <button className="consult__btn mbtn mbtn-red" type="button" onClick={handleClick}>
                    <span>Обратная связь</span>
                    <svg width="21" height="29" viewBox="0 0 21 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path opacity="0.3" d="M0 0L13.4129 14.5L0 29H7.58707L21 14.5L7.58707 0H0Z" fill="white" />
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
                src="/img/consult.webp"
                data-src="/img/consult.webp"
                alt=""
              />
            </div>
          </div>
        </section>
        <BrandsSlider/>
        <section className="advantages">
          <div className="container-new">
            <div className="advantages__top">
              <div className="advantages__title display2">Наши преимущества</div>
              <div className="advantages__desc subtitle">Почему клиенты предпочитают работать с нами</div>
            </div>
            <div className="advantages__items">
              {advantages.map((advantage, index) => (
                <div className="advantages__item" key={index}>
                  <div className="advantages__item-title">{advantage.title}</div>
                  <div className="advantages__item-desc body-text">{advantage.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="stage">
          <div className="container-new">
            <div className="stage__top">
              <h2 className="stage__title display2">Этапы работы</h2>
              <p className="stage__desc subtitle">Полностью открытые условия и ничего лишнего</p>
            </div>
            <ol className="stage__items">
              {stages.map((stage, index) => (
                <li key={index} className="stage__item skewBg">
                  <div className="stage__item-in">
                    <h3 className="stage__item-title display4">{stage.title}</h3>
                    <p className="stage__item-desc body-text">{stage.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="recommendation">
          <div className="container-new">
            <h2 className="recommendation__title display2">Нас рекомендуют</h2>
            <div className="recommendation__items">
              {recommendations.map((video, index) => (
                <div className="recommendation__item" key={index}>
                  <div className="recommendation__video">
                  <video
                    src={video.src}
                    poster={video.poster}
                    controls
                    controlsList="nodownload"
                    preload="metadata"
                    style={{ width: '100%', height: `${height}px`, objectFit: 'contain' }}
                  />
                  </div>
                  <a href={video.url} target='_blank' className="recommendation__desc body-text">{video.title}<img src='/img/telegram.png' style={{ width: '20px', height: '20px', margin: '5px 0px 0px 10px' }}/></a>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="consult contacts">
          <div className="consult__left">
            <div className="consult__container" style={{ width: '759.72px' }}>
              <div className="consult__content">
                <div className="consult__title display2">Контакты</div>
                <div className="consult__desc subtitle">
                  Приходите в гости, мы будем вам рады
                </div>
                <div className="contacts__items">
                  {/* <div className="contacts__item contacts__phone">
                    <Num />
                  </div> */}
                  <a href="https://yandex.ru/maps/-/CLEzf63V" target='_blank' className="contacts__item">
                    620146, Свердловская область, г Екатеринбург, Московская ул, д. 194
                  </a>
                  <a href="mailto:importeurocar@yandex.com" className="contacts__item">
                    importeurocar@yandex.com
                  </a>
                </div>
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
                src="/img/rgndkd7k49kjc5zmv1lo6o56s7d30b1y.png"
                data-src="/img/rgndkd7k49kjc5zmv1lo6o56s7d30b1y.png"
                alt=""
              />
            </div>
          </div>
        </section>
        {/* <div className={styles.dashboard__brands}>
          <BrandsSlider />
        </div>
        <h2 className={`${styles.dashboard__title} ${darkModeClass}`}>
          Пригон авто из Европы, США, Кореи
        </h2>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Проданные автомобили
          </h3>
          <SoldCarsSlider items={soldCars} spinner={spinner} />
        </div>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Новинки
          </h3>
          <DashboardSlider items={newParts.rows || []} spinner={spinner} />
        </div>
        <div className={styles.dashboard__about}>
          <h3
            className={`${styles.dashboard__parts__title} ${styles.dashboard__about__title} ${darkModeClass}`}
          >
            О компании
          </h3>
          <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
            ООО &quot;ТЛТТРАНС&quot; — эксперт в пригоне автомобилей из Европы,
            США и Кореи. Мы подбираем, проверяем, доставляем и оформляем авто,
            снижая таможенные расходы для клиентов.
          </p>
        </div> */}
      </div>
    </section>
  )
}

export default DashboardPage
