import { ICar, IBoilerPart } from '@/types/boilerparts'

/**
 * Преобразует данные автомобиля из новой структуры (CarEntity) в старую (IBoilerPart)
 * для обеспечения обратной совместимости с существующими компонентами
 */
export function mapCarToBoilerPart(car: ICar): IBoilerPart {
  // Создаем массив изображений из файлов
  const images = car.files?.map(file => {
    // В новом API изображения хранятся в БД, используем base64 данные
    // Если есть path, используем его, иначе создаем URL для получения изображения
    if (file.path) {
      return file.path
    }
    // Если изображение хранится в БД, создаем URL для API
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://car-api-production.up.railway.app'
    return `${baseUrl}/images/${file.filename}`
  }) || []
  
  return {
    // Обязательные поля для IBoilerPart
    id: car.id,
    fuel: car.fuel,
    createdAt: null, // Старое поле должно быть null
    Drive: car.drive,
    Transmission: car.gearbox,
    Engine: car.engine?.toString() || '',
    Mileage: car.mileage?.toString() || '',
    Year: car.year?.toString() || '',
    Model: car.model,
    title: `${car.brand} ${car.model}`,
    boiler_manufacturer: car.brand,
    price: car.price,
    parts_manufacturer: car.brand,
    vendor_code: car.vin || '', // Если vin null, используем пустую строку
    sale: car.isSold || false, // Используем только isSold для определения статуса продажи
    name: `${car.brand} ${car.model}`,
    description: car.description,
    images: JSON.stringify(images),
    in_stock: car.deletedAt ? 0 : 1, // Если удален, то не в наличии
    bestseller: false, // Пока не реализовано в новой структуре
    new: false, // Пока не реализовано в новой структуре
    popularity: 0, // Пока не реализовано в новой структуре
    compatibility: '', // Пока не реализовано в новой структуре
    
    // Опциональные поля из ICar (добавляем только те, что есть в IBoilerPart)
    brand: car.brand,
    year: car.year,
    mileage: car.mileage,
    vin: car.vin,
    gearbox: car.gearbox,
    powerValue: car.powerValue,
    powerType: car.powerType,
    drive: car.drive,
    updatedAt: car.updatedAt,
    deletedAt: car.deletedAt,
    conditionerType: car.conditionerType,
    windowLifter: car.windowLifter,
    interiorMaterials: car.interiorMaterials,
    interiorColor: car.interiorColor,
    powerSteering: car.powerSteering,
    steeringWheelAdjustment: car.steeringWheelAdjustment,
    spareWheel: car.spareWheel,
    headlights: car.headlights,
    seatAdjustment: car.seatAdjustment,
    memorySeatModule: car.memorySeatModule,
    seatHeated: car.seatHeated,
    seatVentilation: car.seatVentilation,
    group1: car.group1,
    group2: car.group2,
    group3: car.group3,
    group4: car.group4,
    group5: car.group5,
    group6: car.group6,
    group7: car.group7,
    group8: car.group8,
    group9: car.group9,
    files: car.files,
    admin: car.admin,
  }
}

/**
 * Преобразует массив автомобилей в массив IBoilerPart
 */
export function mapCarsToBoilerParts(cars: ICar[]): IBoilerPart[] {
  return cars.map(mapCarToBoilerPart)
}

/**
 * Создает объект IBoilerParts из массива автомобилей
 */
export function createBoilerPartsFromCars(cars: ICar[]): { count: number; rows: IBoilerPart[] } {
  return {
    count: cars.length,
    rows: mapCarsToBoilerParts(cars)
  }
}
