import { IFeedbackInput } from '@/types/feedbackForm'
import styles from '@/styles/feedbackForm/index.module.scss'

const PhoneInput = ({ register, errors, darkModeClass }: IFeedbackInput) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <h1>Телефон: <span>*</span></h1>
    <input
      className={styles.feedback_form__form__input}
      // placeholder="+7 999 999 99 99"
      type="tel"
      {...register('phone', {
        required: 'Введите телефон!',
        pattern: {
          value: /^\+?[0-9\s\-()]{11,20}$/,
          message: 'Недопустимый формат телефона',
        },
        minLength: 11,
        maxLength: 12,
      })}
    />
    {errors.phone && (
      <span className={styles.error_alert}>{errors.phone?.message}</span>
    )}
    {errors.phone && errors.phone.type === 'minLength' && (
      <span className={styles.error_alert}>Минимум 11 цифр!</span>
    )}
    {errors.phone && errors.phone.type === 'maxLength' && (
      <span className={styles.error_alert}>Не более 12 цифр!</span>
    )}
  </label>
)

export default PhoneInput
