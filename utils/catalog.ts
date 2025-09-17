import { NextRouter } from 'next/router'
import { getQueryParamOnFirstRender, idGenerator } from './common'
import { getBoilerPartsFx, getFilteredCarsFx } from '@/app/api/boilerParts'
import { setFilteredBoilerParts } from '@/context/boilerParts'

const createManufacturerCheckboxObj = (title: string) => ({
  title,
  checked: false,
  id: idGenerator(),
})

export const boilerManufacturers = [
  'Audi',
  'BMW',
  'Chery',
  'Chevrolet',
  'Citroen',
  'Ford',
  'Geely',
  'Haval',
  'Honda',
  'Hyundai',
  'Kia',
  'Land Rover',
  'Lexus',
  'Mazda',
  'Mercedes',
  'Mitsubishi',
  'Nissan',
  'Opel',
  'Peugeot',
  'Porsche',
  'Renault',
  'SSang Yong',
  'Skoda',
  'Subaru',
  'Suzuki',
  'Toyota',
  'Volkswagen',
  'Volvo',
].map(createManufacturerCheckboxObj)

export const partsManufacturers = ['Европа', 'Сша', 'Корея'].map(
  createManufacturerCheckboxObj
)

const checkPriceFromQuery = (price: number) =>
  price && !isNaN(price) && price >= 0 && price <= 10000

export const checkQueryParams = (router: NextRouter) => {
  const priceFromQueryValue = getQueryParamOnFirstRender(
    'priceFrom',
    router
  ) as string
  const priceToQueryValue = getQueryParamOnFirstRender(
    'priceTo',
    router
  ) as string
  const boilerQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('boiler', router) as string)
  )
  const partsQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('parts', router) as string)
  )
  const isValidBoilerQuery =
    Array.isArray(boilerQueryValue) && !!boilerQueryValue?.length
  const isValidPartsQuery =
    Array.isArray(partsQueryValue) && !!partsQueryValue?.length
  const isValidPriceQuery =
    checkPriceFromQuery(+priceFromQueryValue) &&
    checkPriceFromQuery(+priceToQueryValue)

  return {
    isValidBoilerQuery,
    isValidPartsQuery,
    isValidPriceQuery,
    priceFromQueryValue,
    priceToQueryValue,
    boilerQueryValue,
    partsQueryValue,
  }
}

export const updateParamsAndFiltersFromQuery = async (
  callback: VoidFunction,
  path: string
) => {
  callback()

  const data = await getBoilerPartsFx(`/cars?limit=20&offset=${path}`)

  setFilteredBoilerParts(data)
}

export async function updateParamsAndFilters<T>(
  updatedParams: T,
  path: string,
  router: NextRouter
) {
  const params = router.query

  delete params.boiler
  delete params.parts
  delete params.priceFrom
  delete params.priceTo

  router.push(
    {
      query: {
        ...params,
        ...updatedParams,
      },
    },
    undefined,
    { shallow: true }
  )

  // Используем новый API для фильтрации
  const searchParams = {
    limit: 20,
    page: 1,
    // Добавляем фильтры из параметров
    ...(updatedParams as any)
  }

  const data = await getFilteredCarsFx(searchParams)

  setFilteredBoilerParts(data)
}
