import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import { ICatalogFiltersProps } from '@/types/catalog'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  $boilerManufacturers,
  $partsManufacturers,
  setBoilerManufacturersFromQuery,
  setPartsManufacturersFromQuery,
} from '@/context/boilerParts'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'
import { getQueryParamOnFirstRender } from '@/utils/common'
import CatalogFiltersMobile from './CatalogFiltersMobile'
import {
  checkQueryParams,
  updateParamsAndFilters,
  updateParamsAndFiltersFromQuery,
} from '@/utils/catalog'
import { getFilteredCarsFx } from '@/app/api/boilerParts'
import { setFilteredBoilerParts } from '@/context/boilerParts'

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  resetFilters,
  isPriceRangeChanged,
  currentPage,
  setIsFilterInQuery,
  closePopup,
  filtersMobileOpen,
}: ICatalogFiltersProps) => {
  const isMobile = useMediaQuery(820)
  const [spinner, setSpinner] = useState(false)
  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)
  const router = useRouter()

  const updatePriceFromQuery = useCallback(
    (priceFrom: number, priceTo: number) => {
      setIsFilterInQuery(true)
      setPriceRange([+priceFrom, +priceTo])
      setIsPriceRangeChanged(true)
    },
    [setIsFilterInQuery, setPriceRange, setIsPriceRangeChanged]
  )

  const applyFiltersFromQuery = useCallback(async () => {
    try {
      const {
        isValidBoilerQuery,
        isValidPartsQuery,
        isValidPriceQuery,
        partsQueryValue,
        priceFromQueryValue,
        boilerQueryValue,
        priceToQueryValue,
      } = checkQueryParams(router)

      const boilerQuery = `&boiler=${getQueryParamOnFirstRender(
        'boiler',
        router
      )}`
      const partsQuery = `&parts=${getQueryParamOnFirstRender('parts', router)}`
      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

      if (isValidBoilerQuery && isValidPartsQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setBoilerManufacturersFromQuery(boilerQueryValue)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${priceQuery}${boilerQuery}${partsQuery}`)
        return
      }

      if (isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
        }, `${currentPage}${priceQuery}`)
      }

      if (isValidBoilerQuery && isValidPartsQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setBoilerManufacturersFromQuery(boilerQueryValue)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${boilerQuery}${partsQuery}`)
        return
      }

      if (isValidBoilerQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setBoilerManufacturersFromQuery(boilerQueryValue)
        }, `${currentPage}${boilerQuery}`)
      }

      if (isValidPartsQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${partsQuery}`)
      }

      if (isValidPartsQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${priceQuery}${partsQuery}`)
      }

      if (isValidBoilerQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setBoilerManufacturersFromQuery(boilerQueryValue)
        }, `${currentPage}${priceQuery}${boilerQuery}`)
      }
    } catch (error) {
      const err = error as Error

      if (err.message === 'URI malformed') {
        toast.warning('Неправильный url для фильтров')
        return
      }

      toast.error(err.message)
    }
  }, [router, currentPage, updatePriceFromQuery, setIsFilterInQuery])

  useEffect(() => {
    applyFiltersFromQuery()
  }, [applyFiltersFromQuery])

  const applyFilters = useCallback(async () => {
    setIsFilterInQuery(true)
    try {
      setSpinner(true)
      const priceFrom = Math.ceil(priceRange[0])
      const priceTo = Math.ceil(priceRange[1])
      
      const boilers = boilerManufacturers
        .filter((item) => item.checked)
        .map((item) => item.title)
      const parts = partsManufacturers
        .filter((item) => item.checked)
        .map((item) => item.title)
      
      // Создаем параметры для нового API
      const searchParams: any = {
        limit: 20,
        page: 1
      }

      // Добавляем фильтры по бренду (boilers -> brand)
      if (boilers.length > 0) {
        searchParams.brand = boilers[0] // Берем первый выбранный бренд
      }

      // Добавляем фильтры по цене
      if (isPriceRangeChanged) {
        searchParams.priceStart = priceFrom
        searchParams.priceEnd = priceTo
      }

      // Обновляем URL параметры для совместимости
      const encodedBoilerQuery = encodeURIComponent(JSON.stringify(boilers))
      const encodedPartsQuery = encodeURIComponent(JSON.stringify(parts))
      
      const urlParams = {
        boiler: encodedBoilerQuery,
        parts: encodedPartsQuery,
        priceFrom: isPriceRangeChanged ? priceFrom : undefined,
        priceTo: isPriceRangeChanged ? priceTo : undefined,
        offset: 1,
      }

      // Обновляем URL
      router.push(
        {
          query: {
            ...router.query,
            ...urlParams,
          },
        },
        undefined,
        { shallow: true }
      )

      // Используем новый API для фильтрации
      const data = await getFilteredCarsFx(searchParams)
      setFilteredBoilerParts(data)
      
    } catch (error) {
      console.error('Error applying filters:', error)
      toast.error('Ошибка при применении фильтров')
    } finally {
      setSpinner(false)
    }
  }, [
    priceRange,
    isPriceRangeChanged,
    boilerManufacturers,
    partsManufacturers,
    currentPage,
    router,
    setIsFilterInQuery
  ])

  return (
    <>
      {isMobile ? (
        <CatalogFiltersMobile
          closePopup={closePopup}
          spinner={spinner}
          applyFilters={applyFilters}
          priceRange={priceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          setPriceRange={setPriceRange}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetFilters}
          filtersMobileOpen={filtersMobileOpen}
        />
      ) : (
        <CatalogFiltersDesktop
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          spinner={spinner}
          resetFilters={resetFilters}
          applyFilters={applyFilters}
        />
      )}
    </>
  )
}

export default CatalogFilters
