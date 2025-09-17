import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || 'https://car-api-production.up.railway.app',
})

// Добавляем логирование для отладки
instance.interceptors.request.use((config) => {
  console.log('🚀 API Request:', config.method?.toUpperCase(), config.url)
  return config
})

instance.interceptors.response.use((response) => {
  console.log('📡 API Response:', response.status, response.config.url, 'Data length:', Array.isArray(response.data) ? response.data.length : 'Not array')
  return response
})

export default instance
