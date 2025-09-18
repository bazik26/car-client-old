import { ReactNode } from 'react'

export interface IFile {
  id: number
  filename: string
  mimetype: string
  path: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface IAdmin {
  id: number
  username: string
  email: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface ICar {
  id: number
  brand: string
  model: string
  year: number
  mileage: number
  vin: string | null
  gearbox: string
  fuel: string
  powerValue: number
  powerType: string
  engine: string
  drive: string
  price: number
  isSold: boolean
  promo: boolean | null
  description: string
  conditionerType: string | null
  windowLifter: string | null
  interiorMaterials: string | null
  interiorColor: string | null
  powerSteering: string | null
  steeringWheelAdjustment: string | null
  spareWheel: string | null
  headlights: string | null
  seatAdjustment: string | null
  memorySeatModule: string | null
  seatHeated: string | null
  seatVentilation: string | null
  group1: string[]
  group2: string[]
  group3: string[]
  group4: string[]
  group5: string[]
  group6: string[]
  group7: string[]
  group8: string[]
  group9: string[]
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  files: IFile[]
  admin: IAdmin | null
}

export interface IBoilerPart {
  // Старые поля для совместимости
  fuel: string
  createdAt: null
  Drive: string
  Transmission: string
  Engine: string
  Mileage: string
  Year: string
  Model: string
  title: ReactNode
  id: number
  boiler_manufacturer: string
  price: number
  sale: boolean
  promo: boolean | null
  parts_manufacturer: string
  vendor_code: string
  name: string
  description: string
  images: string
  in_stock: number
  bestseller: boolean
  new: boolean
  popularity: number
  compatibility: string
  
  // Новые поля из ICar
  brand?: string
  year?: number
  mileage?: number
  vin?: string | null
  gearbox?: string
  powerValue?: number
  powerType?: string
  drive?: string
  updatedAt?: string
  deletedAt?: string | null
  conditionerType?: string | null
  windowLifter?: string | null
  interiorMaterials?: string | null
  interiorColor?: string | null
  powerSteering?: string | null
  steeringWheelAdjustment?: string | null
  spareWheel?: string | null
  headlights?: string | null
  seatAdjustment?: string | null
  memorySeatModule?: string | null
  seatHeated?: string | null
  seatVentilation?: string | null
  group1?: string[]
  group2?: string[]
  group3?: string[]
  group4?: string[]
  group5?: string[]
  group6?: string[]
  group7?: string[]
  group8?: string[]
  group9?: string[]
  files?: IFile[]
  admin?: IAdmin | null
}

export interface IBoilerParts {
  count: number
  rows: IBoilerPart[]
}
