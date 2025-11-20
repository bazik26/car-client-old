import { ICar, IBoilerPart } from '@/types/boilerparts'
import { safeNumber } from './common'

const toOptionalString = (value: unknown): string =>
  value === null || value === undefined ? '' : String(value)

/**
 * Преобразует данные автомобиля из новой структуры (CarEntity) в старую (IBoilerPart)
 * для обеспечения обратной совместимости с существующими компонентами
 */
export function mapCarToBoilerPart(car: ICar): IBoilerPart {
  // Создаем массив изображений из файлов
  // Используем ту же логику что и в car-client для совместимости
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://car-api-production.up.railway.app'
  const files = Array.isArray(car.files) ? car.files : []

  const images = files
    .map(file => {
      if (!file || !file.path) {
        return null
      }

      // Логика из car-client getFileUrl()
      const imagePath = file.path

      // Если path содержит старый домен shop-ytb-client, заменяем на наш API
      if (imagePath.includes('shop-ytb-client.onrender.com')) {
        const relativePath = imagePath.replace(/https?:\/\/shop-ytb-client\.onrender\.com/, '')
        const normalizedPath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`
        return `${baseUrl}${normalizedPath}`
      }

      // Если полный URL (другой домен) - используем как есть
      if (imagePath.startsWith('http')) {
        return imagePath
      }

      // Относительный путь - добавляем API_URL
      // Убираем 'images/' из начала пути, так как ServeStaticModule раздаёт файлы из /images по корню
      let cleanPath = imagePath
      if (cleanPath.startsWith('images/')) {
        cleanPath = cleanPath.replace('images/', '')
      }
      const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`
      return `${baseUrl}${normalizedPath}`
    })
    .filter((src): src is string => typeof src === 'string' && src.trim().length > 0)

  const brand = typeof car.brand === 'string' ? car.brand : ''
  const model = typeof car.model === 'string' ? car.model : ''
  const composedName = `${brand} ${model}`.trim()
  const name = composedName || brand || model || 'Автомобиль'
  const description = typeof car.description === 'string' ? car.description : ''
  const fuel = typeof car.fuel === 'string' ? car.fuel : ''
  const drive = typeof car.drive === 'string' ? car.drive : ''
  const gearbox = typeof car.gearbox === 'string' ? car.gearbox : ''

  const yearValue =
    typeof car.year === 'number' && Number.isFinite(car.year)
      ? car.year
      : safeNumber(car.year, NaN)

  const mileageValue =
    typeof car.mileage === 'number' && Number.isFinite(car.mileage)
      ? car.mileage
      : safeNumber(car.mileage, NaN)

  const powerValue =
    typeof car.powerValue === 'number' && Number.isFinite(car.powerValue)
      ? car.powerValue
      : safeNumber(car.powerValue, NaN)

  return {
    // Обязательные поля для IBoilerPart
    id: car.id,
    fuel,
    createdAt: null, // Старое поле должно быть null
    Drive: drive,
    Transmission: gearbox,
    Engine: toOptionalString(car.engine),
    Mileage: mileageValue && Number.isFinite(mileageValue) ? mileageValue.toString() : toOptionalString(car.mileage),
    Year: yearValue && Number.isFinite(yearValue) ? yearValue.toString() : toOptionalString(car.year),
    Model: model,
    title: name,
    boiler_manufacturer: brand,
    price: safeNumber(car.price),
    parts_manufacturer: brand,
    vendor_code: typeof car.vin === 'string' ? car.vin : '', // Если vin null, используем пустую строку
    sale: Boolean(car.isSold), // Используем только isSold для определения статуса продажи
    promo: car.promo,
    name,
    description,
    images: JSON.stringify(images),
    in_stock: car.deletedAt ? 0 : 1, // Если удален, то не в наличии
    bestseller: false, // Пока не реализовано в новой структуре
    new: false, // Пока не реализовано в новой структуре
    popularity: 0, // Пока не реализовано в новой структуре
    compatibility: description, // Используем description для совместимости
    
    // Опциональные поля из ICar (добавляем только те, что есть в IBoilerPart)
    brand: brand || undefined,
    year: Number.isFinite(yearValue) ? yearValue : undefined,
    mileage: Number.isFinite(mileageValue) ? mileageValue : undefined,
    vin: typeof car.vin === 'string' ? car.vin : undefined,
    gearbox: gearbox || undefined,
    powerValue: Number.isFinite(powerValue) ? powerValue : undefined,
    powerType: typeof car.powerType === 'string' ? car.powerType : undefined,
    drive: drive || undefined,
    updatedAt: typeof car.updatedAt === 'string' ? car.updatedAt : undefined,
    deletedAt: car.deletedAt ?? undefined,
    conditionerType: car.conditionerType ?? undefined,
    windowLifter: car.windowLifter ?? undefined,
    interiorMaterials: car.interiorMaterials ?? undefined,
    interiorColor: car.interiorColor ?? undefined,
    powerSteering: car.powerSteering ?? undefined,
    steeringWheelAdjustment: car.steeringWheelAdjustment ?? undefined,
    spareWheel: car.spareWheel ?? undefined,
    headlights: car.headlights ?? undefined,
    seatAdjustment: car.seatAdjustment ?? undefined,
    memorySeatModule: car.memorySeatModule ?? undefined,
    seatHeated: car.seatHeated ?? undefined,
    seatVentilation: car.seatVentilation ?? undefined,
    group1: Array.isArray(car.group1) ? car.group1 : undefined,
    group2: Array.isArray(car.group2) ? car.group2 : undefined,
    group3: Array.isArray(car.group3) ? car.group3 : undefined,
    group4: Array.isArray(car.group4) ? car.group4 : undefined,
    group5: Array.isArray(car.group5) ? car.group5 : undefined,
    group6: Array.isArray(car.group6) ? car.group6 : undefined,
    group7: Array.isArray(car.group7) ? car.group7 : undefined,
    group8: Array.isArray(car.group8) ? car.group8 : undefined,
    group9: Array.isArray(car.group9) ? car.group9 : undefined,
    files: files.length > 0 ? files : undefined,
    admin: car.admin ?? undefined,
  }
}

/**
 * Преобразует массив автомобилей в массив IBoilerPart
 */
export function mapCarsToBoilerParts(cars?: ICar[] | null): IBoilerPart[] {
  if (!Array.isArray(cars)) {
    return []
  }

  return cars
    .filter((car): car is ICar => Boolean(car))
    .map(mapCarToBoilerPart)
}

/**
 * Создает объект IBoilerParts из массива автомобилей
 */
export function createBoilerPartsFromCars(
  cars?: ICar[] | null
): { count: number; rows: IBoilerPart[] } {
  const rows = mapCarsToBoilerParts(cars)

  return {
    count: rows.length,
    rows,
  }
}
