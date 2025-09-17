/**
 * Универсальная функция для отправки сообщений в Telegram через наш API
 */
export interface TelegramFormData {
  messenger: string
  firstName: string
  phone: string
  email?: string
  message?: string
  domain?: string
  carInfo?: string
  additionalData?: Record<string, any>
}

export const sendToTelegram = async (data: TelegramFormData): Promise<boolean> => {
  try {
    const telegramData = {
      messenger: data.messenger,
      firstName: data.firstName,
      phone: data.phone,
      email: data.email || 'Не указан',
      message: data.message || 'Сообщение не указано',
      domain: data.domain || window.location.hostname,
      carInfo: data.carInfo || 'Не указан',
      ...data.additionalData
    }

    const response = await fetch('https://car-api-production.up.railway.app/contact-us', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(telegramData),
    })

    return response.ok
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error)
    return false
  }
}

/**
 * Функция для отправки формы обратной связи
 */
export const sendFeedbackForm = async (formData: {
  name: string
  phone: string
  email?: string
  message?: string
  carInfo?: string
}): Promise<boolean> => {
  return sendToTelegram({
    messenger: 'Форма обратной связи',
    firstName: formData.name,
    phone: formData.phone,
    email: formData.email,
    message: formData.message,
    carInfo: formData.carInfo
  })
}

/**
 * Функция для отправки формы консультации
 */
export const sendConsultationForm = async (formData: {
  name: string
  phone: string
  brand?: string
  model?: string
  generation?: string
}): Promise<boolean> => {
  return sendToTelegram({
    messenger: 'Форма консультации',
    firstName: formData.name,
    phone: formData.phone,
    carInfo: formData.brand && formData.model 
      ? `${formData.brand} ${formData.model} ${formData.generation || ''}`.trim()
      : 'Не указан'
  })
}

/**
 * Функция для отправки формы "Написать сообщение"
 */
export const sendContactForm = async (formData: {
  name: string
  phone: string
  message?: string
}): Promise<boolean> => {
  return sendToTelegram({
    messenger: 'Форма контактов',
    firstName: formData.name,
    phone: formData.phone,
    message: formData.message
  })
}
