import { createEffect } from 'effector-next'
import api from '../axiosClient'
import { toast } from 'react-toastify'
import { ICar } from '@/types/boilerparts'
import { mapCarToBoilerPart, createBoilerPartsFromCars } from '@/utils/carMapper'

export const getBestsellersOrNewPartsFx = createEffect(async (url: string) => {
  // Используем поиск для получения всех автомобилей
  const searchParams = {
    limit: 100
  }
  
  const { data } = await api.post('/cars/search', searchParams)

  // Если данные приходят в новом формате (массив ICar), преобразуем их
  if (data.cars && Array.isArray(data.cars)) {
    return createBoilerPartsFromCars(data.cars as ICar[])
  }

  return { count: 0, rows: [] }
})

export const getSoldCarsFx = createEffect(async (url: string) => {
  try {
    // Используем поиск для получения всех автомобилей, затем фильтруем проданные
    const searchParams = {
      limit: 100
    }
    
    const { data } = await api.post('/cars/search', searchParams)

    // Если данные приходят в новом формате (массив ICar), фильтруем проданные
    if (data.cars && Array.isArray(data.cars)) {
      // Фильтруем только проданные автомобили (sale: true или isSold: true)
      const soldCars = data.cars.filter((car: ICar) => car.sale === true || car.isSold === true)
      console.log('🚗 Found sold cars:', soldCars.length)
      return soldCars.map(mapCarToBoilerPart)
    }

    return []
  } catch (error) {
    console.error('Error in getSoldCarsFx:', error)
    toast.error('Ошибка при загрузке проданных автомобилей')
    return []
  }
})

export const getBoilerPartsFx = createEffect(async (url: string) => {
  console.log('🔍 getBoilerPartsFx called with URL:', url)
  
  // Используем поиск для получения всех автомобилей
  const searchParams = {
    limit: 100
  }
  
  const { data } = await api.post('/cars/search', searchParams)
  
  console.log('📡 API Response data:', data)
  console.log('📊 Cars length:', data.cars ? data.cars.length : 'No cars field')
  
  // Если данные приходят в новом формате (массив ICar), преобразуем их
  if (data.cars && Array.isArray(data.cars)) {
    const mappedData = createBoilerPartsFromCars(data.cars as ICar[])
    console.log('🔄 Mapped data:', mappedData)
    console.log('📈 Mapped count:', mappedData.count, 'rows:', mappedData.rows.length)
    return mappedData
  }
  
  console.log('⚠️ No cars field found, returning empty data')
  return { count: 0, rows: [] }
})

export const getBoilerPartFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)
  
  // Если данные приходят в новом формате (ICar), преобразуем их
  if (data && typeof data === 'object' && 'brand' in data) {
    return mapCarToBoilerPart(data as ICar)
  }
  
  return data
})

export const searchPartsFx = createEffect(
  async ({ url, search }: { url: string; search: string }) => {
    try {
      // Используем улучшенный API поиска с LIKE запросами
      const searchParams = {
        brand: search,
        model: search,
        limit: 50
      }
      
      const { data } = await api.post('/cars/search', searchParams)

      // Если данные приходят в новом формате (массив ICar), преобразуем их
      if (data.cars && Array.isArray(data.cars)) {
        return data.cars.map(mapCarToBoilerPart)
      }
      
      return []
    } catch (error) {
      console.error('Search error:', error)
      toast.error('Ошибка при поиске')
      return []
    }
  }
)

export const getPartByNameFx = createEffect(
  async ({ url, name }: { url: string; name: string }) => {
    try {
      // Используем улучшенный API поиска
      const searchParams = {
        brand: name,
        model: name,
        limit: 1
      }
      
      const { data } = await api.post('/cars/search', searchParams)

      // Если данные приходят в новом формате (массив ICar), берем первый элемент
      if (data.cars && Array.isArray(data.cars) && data.cars.length > 0) {
        return mapCarToBoilerPart(data.cars[0] as ICar)
      }
      
      return null
    } catch (error) {
      console.error('Get part by name error:', error)
      toast.error('Ошибка при поиске товара')
      return null
    }
  }
)

// Новая функция для фильтрации с использованием правильного API
export const getFilteredCarsFx = createEffect(
  async (searchParams: any) => {
    try {
      const { data } = await api.post('/cars/search', searchParams)

      // Если данные приходят в новом формате (массив ICar), преобразуем их
      if (data.cars && Array.isArray(data.cars)) {
        return createBoilerPartsFromCars(data.cars as ICar[])
      }

      return { count: 0, rows: [] }
    } catch (error) {
      console.error('Error in getFilteredCarsFx:', error)
      toast.error('Ошибка при загрузке отфильтрованных автомобилей')
      return { count: 0, rows: [] }
    }
  }
)
