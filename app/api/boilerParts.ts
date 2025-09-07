import { createEffect } from 'effector-next'
import api from '../axiosClient'
import { toast } from 'react-toastify'
import { ICar } from '@/types/boilerparts'
import { mapCarToBoilerPart, createBoilerPartsFromCars } from '@/utils/carMapper'

export const getBestsellersOrNewPartsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)
  
  // Если данные приходят в новом формате (массив ICar), преобразуем их
  if (Array.isArray(data)) {
    return createBoilerPartsFromCars(data as ICar[])
  }
  
  return data
})

export const getSoldCarsFx = createEffect(async (url: string) => {
  try {
    const { data } = await api.get(url)
    
    // Если данные приходят в новом формате (массив ICar), преобразуем их
    if (Array.isArray(data)) {
      return data.map(mapCarToBoilerPart)
    }
    
    return data
  } catch (error) {
    console.error('Error in getSoldCarsFx:', error)
    toast.error('Ошибка при загрузке проданных автомобилей')
    return []
  }
})

export const getBoilerPartsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)
  
  // Если данные приходят в новом формате (массив ICar), преобразуем их
  if (Array.isArray(data)) {
    return createBoilerPartsFromCars(data as ICar[])
  }
  
  return data
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
    // Для нового API используем поиск по бренду и модели
    const searchParams = {
      brand: search,
      model: search
    }
    
    const { data } = await api.post(url, searchParams)

    // Если данные приходят в новом формате (массив ICar), преобразуем их
    if (Array.isArray(data)) {
      return data.map(mapCarToBoilerPart)
    }
    
    return data.rows || data
  }
)

export const getPartByNameFx = createEffect(
  async ({ url, name }: { url: string; name: string }) => {
    try {
      // Для нового API используем поиск по бренду и модели
      const searchParams = {
        brand: name,
        model: name
      }
      
      const { data } = await api.post(url, searchParams)

      // Если данные приходят в новом формате (массив ICar), берем первый элемент
      if (Array.isArray(data) && data.length > 0) {
        return mapCarToBoilerPart(data[0] as ICar)
      }
      
      // Если данные приходят в новом формате (ICar), преобразуем их
      if (data && typeof data === 'object' && 'brand' in data) {
        return mapCarToBoilerPart(data as ICar)
      }

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)
