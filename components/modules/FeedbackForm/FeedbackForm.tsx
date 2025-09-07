import { $mode } from '@/context/mode'
import styles from '@/styles/feedbackForm/index.module.scss'
import { useStore } from 'effector-react'
import emailjs from '@emailjs/browser'
import NameInput from './NameInput'
import { useForm } from 'react-hook-form'
import { FeedbackInputs } from '@/types/feedbackForm'
import PhoneInput from './PhoneInput'
import EmailInput from './EmailInput'
import MessageInput from './MessageInput'
import { MutableRefObject, useRef, useState } from 'react'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { toast } from 'react-toastify'

type FeedbackFormProps = {
  previousData: {
    brand: string
    model: string
    generation: string
  }
}

const FeedbackForm = ({ previousData }: FeedbackFormProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackInputs>()
  const [spinner, setSpinner] = useState(false)
  const formRef = useRef() as MutableRefObject<HTMLFormElement>

  const handleClick = () => {
    const form = document.querySelector('.formbord') as HTMLElement
  
    if (form) {
      if (window.innerWidth < 560) {
        form.style.right = '-400px'
      } else {
        form.style.display = 'none'
      }
    }
  }

  const submitForm = () => {
    setSpinner(true)
    emailjs
      .sendForm(
        'service_p9wgb29',
        'template_3mgzpeo',
        formRef.current,
        'iEjvhpUevYZ6nELPm'
      )
      .then((result) => {
        setSpinner(false)
        toast.success(`Сообщение отправлено! ${result.text}`)
        handleClick()
      })
      .catch((error) => {
        setSpinner(false)
        toast.error(`Что-то пошло не так! ${error.text}`)
      })

    formRef.current.reset()
  }

  return (
    <div className={`${styles.feedback_form} ${darkModeClass}`}>
      <span className="jqmClose top-close stroke-theme-hover" onClick={handleClick} title="Закрыть">
        <i className="svg inline  svg-inline-" aria-hidden="true">
          <svg width="21" height="21" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 1L1 13M1 1L13 13" stroke="#f2f2f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </i>
      </span>
      <h3 className={`${styles.feedback_form__title} ${darkModeClass}`}>
        Форма обратной связи
      </h3>
      <p>
        Менеджеры компании с радостью ответят на ваши вопросы и произведут расчет стоимости услуг и подготовят индивидуальное коммерческое предложение.
      </p>
      <form
        ref={formRef}
        className={styles.feedback_form__form}
        onSubmit={handleSubmit(submitForm)}
      >
        <NameInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <PhoneInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <EmailInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <MessageInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <input type="hidden" name="brand" value={previousData?.brand || ''} />
        <input type="hidden" name="model" value={previousData?.model || ''} />
        <input type="hidden" name="generation" value={previousData?.generation || ''} />
        <div className={styles.feedback_form__form__btn}>
          <button>
            {spinner ? (
              <span
                className={spinnerStyles.spinner}
                style={{ top: '3px', left: '43%' }}
              />
            ) : (
              'Отправить'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FeedbackForm
