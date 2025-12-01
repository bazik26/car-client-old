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
    console.log('🚨🚨🚨 GET SOLD CARS FX CALLED 🚨🚨🚨')
    console.log('🔍 getSoldCarsFx called with URL:', url)
    
    // Используем поиск для получения всех автомобилей, затем фильтруем проданные
    const searchParams = {
      limit: 100
    }
    
    const { data } = await api.post('/cars/search', searchParams)
    console.log('📡 API Response for sold cars:', data)
    console.log('📊 Total cars from API:', data.cars ? data.cars.length : 'No cars field')

    // Если данные приходят в новом формате (массив ICar), фильтруем проданные
    if (data.cars && Array.isArray(data.cars)) {
      // Фильтруем только проданные автомобили
      // API может возвращать isSold как boolean (true/false) или как число (1/0)
      const soldCars = data.cars.filter((car: ICar) => {
        const isSold = Boolean(car.isSold) // Преобразуем в boolean: 1 -> true, 0 -> false
        console.log(`🚗 Car ${car.brand} ${car.model}: isSold=${car.isSold} (converted: ${isSold})`)
        return isSold
      })
      console.log('🚗 Found sold cars:', soldCars.length)
      console.log('🚗 Sold cars details:', soldCars.map((car: ICar) => `${car.brand} ${car.model} (isSold: ${car.isSold})`))
      
      const mappedSoldCars = soldCars.map(mapCarToBoilerPart)
      console.log('🔄 Mapped sold cars:', mappedSoldCars.length)
      return mappedSoldCars
    }

    console.log('⚠️ No cars field found, returning empty array')
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
    // Фильтруем только НЕпроданные машины для каталога
    const availableCars = data.cars.filter((car: ICar) => !car.isSold)
    console.log('🚗 Available cars (not sold):', availableCars.length, 'of', data.cars.length)
    const mappedData = createBoilerPartsFromCars(availableCars as ICar[])
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
      console.log('📤 Sending search request with params:', JSON.stringify(searchParams, null, 2))
      const { data } = await api.post('/cars/search', searchParams)
      console.log('📥 Received response:', {
        totalCars: data.cars?.length || 0,
        pagination: data.pagination,
        firstCarBrand: data.cars?.[0]?.brand
      })

      // Если данные приходят в новом формате (массив ICar), преобразуем их
      if (data.cars && Array.isArray(data.cars)) {
        // Фильтруем только НЕпроданные машины для каталога
        const availableCars = data.cars.filter((car: ICar) => !car.isSold)
        console.log('🚗 Filtered available cars:', availableCars.length, 'of', data.cars.length, 'for brand:', searchParams.brand)
        
        // Проверяем что бренды совпадают
        if (searchParams.brand && availableCars.length > 0) {
          const brandsInResult = Array.from(new Set(availableCars.map((car: ICar) => car.brand)))
          console.log('🏷️ Brands in result:', brandsInResult, 'Expected:', searchParams.brand)
          if (!brandsInResult.includes(searchParams.brand)) {
            console.warn('⚠️ WARNING: Brand mismatch! Expected:', searchParams.brand, 'Got:', brandsInResult)
          }
        }
        
        return createBoilerPartsFromCars(availableCars as ICar[])
      }

      console.warn('⚠️ No cars array in response:', data)
      return { count: 0, rows: [] }
    } catch (error) {
      console.error('❌ Error in getFilteredCarsFx:', error)
      console.error('❌ Request params were:', searchParams)
      toast.error('Ошибка при загрузке отфильтрованных автомобилей')
      return { count: 0, rows: [] }
    }
  }
)
