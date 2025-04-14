import { ReactNode } from 'react'

export interface IBoilerPart {
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
}

export interface IBoilerParts {
  count: number
  rows: IBoilerPart[]
}
