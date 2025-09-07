import { ICar, IBoilerPart } from '@/types/boilerparts'

/**
 * Преобразует данные автомобиля из новой структуры (CarEntity) в старую (IBoilerPart)
 * для обеспечения обратной совместимости с существующими компонентами
 */
export function mapCarToBoilerPart(car: ICar): IBoilerPart {
  // Создаем массив изображений из файлов
  const images = car.files?.map(file => {
    // Если путь уже содержит полный URL, используем его как есть
    if (file.path.startsWith('http')) {
      return file.path
    }
    // Иначе добавляем префикс для локальных файлов
    return `/images/${file.path}`
  }) || []
  
  return {
    // Новые поля (прямое маппинг)
    id: car.id,
    brand: car.brand,
    model: car.model,
    year: car.year,
    mileage: car.mileage,
    vin: car.vin,
    gearbox: car.gearbox,
    fuel: car.fuel,
    powerValue: car.powerValue,
    powerType: car.powerType,
    engine: car.engine,
    drive: car.drive,
    price: car.price,
    description: car.description,
    createdAt: car.createdAt,
    updatedAt: car.updatedAt,
    deletedAt: car.deletedAt,
    files: car.files,
    admin: car.admin,
    
    // Дополнительные поля
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
    
    // Поля для обратной совместимости (старые названия)
    Drive: car.drive,
    Transmission: car.gearbox,
    Engine: car.engine?.toString() || '',
    Mileage: car.mileage?.toString() || '',
    Year: car.year?.toString() || '',
    Model: car.model,
    title: `${car.brand} ${car.model}`,
    boiler_manufacturer: car.brand,
    parts_manufacturer: car.brand,
    vendor_code: car.vin,
    name: `${car.brand} ${car.model}`,
    images: JSON.stringify(images),
    in_stock: car.deletedAt ? 0 : 1, // Если удален, то не в наличии
    bestseller: false, // Пока не реализовано в новой структуре
    new: false, // Пока не реализовано в новой структуре
    popularity: 0, // Пока не реализовано в новой структуре
    compatibility: '', // Пока не реализовано в новой структуре
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
