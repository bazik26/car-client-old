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
import { getFilteredCarsFx, getBoilerPartsFx } from '@/app/api/boilerParts'
import { setFilteredBoilerParts, setBoilerParts } from '@/context/boilerParts'

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
  setFiltersAppliedManually,
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
      
      console.log('🎯 Applying filters - Selected brands:', boilers)
      console.log('🎯 Price range changed:', isPriceRangeChanged, priceFrom, priceTo)
      
      // Обновляем URL параметры для совместимости
      const encodedBoilerQuery = boilers.length > 0 ? encodeURIComponent(JSON.stringify(boilers)) : undefined
      const encodedPartsQuery = parts.length > 0 ? encodeURIComponent(JSON.stringify(parts)) : undefined
      
      const urlParams: any = {
        offset: 1,
      }

      // Добавляем бренды только если они выбраны
      if (encodedBoilerQuery) {
        urlParams.boiler = encodedBoilerQuery
      }

      // Добавляем части только если они выбраны
      if (encodedPartsQuery) {
        urlParams.parts = encodedPartsQuery
      }

      // Добавляем цену только если она изменена
      if (isPriceRangeChanged) {
        urlParams.priceFrom = priceFrom
        urlParams.priceTo = priceTo
      }

      console.log('🔗 Updating URL with params:', urlParams)

      // Устанавливаем флаг, что фильтры применяются вручную
      // Это предотвратит перезагрузку данных через useEffect в CatalogPage
      if (setFiltersAppliedManually) {
        setFiltersAppliedManually(true)
      }

      // Обновляем URL
      await router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            ...urlParams,
          },
        },
        undefined,
        { shallow: true }
      )
      
      console.log('✅ URL updated, router.query after push:', router.query)
      
      // Делаем запросы сразу здесь, чтобы избежать проблем с асинхронным обновлением router.query
      const priceStart = isPriceRangeChanged ? priceFrom : undefined
      const priceEnd = isPriceRangeChanged ? priceTo : undefined
      
      if (boilers.length > 0) {
        console.log(`🚀 Making ${boilers.length} requests for brands:`, boilers)
        
        const allResults = await Promise.all(
          boilers.map(async (brand) => {
            console.log(`📡 Requesting cars for brand: "${brand}"`)
            const result = await getFilteredCarsFx({
              brand: brand,
              priceStart,
              priceEnd,
              limit: 100,
              page: 1
            })
            console.log(`✅ Got ${result.rows?.length || 0} cars for brand "${brand}"`)
            return result
          })
        )
        
        // Объединяем и удаляем дубликаты
        const combinedRows = allResults.flatMap(result => result.rows || [])
        const uniqueRows = Array.from(new Map(combinedRows.map(item => [item.id, item])).values())
        const data = {
          count: uniqueRows.length,
          rows: uniqueRows
        }
        console.log('📊 Combined filtered data:', {
          totalRows: data.rows.length,
          brands: boilers,
          sampleBrands: uniqueRows.slice(0, 5).map(r => r.boiler_manufacturer || r.brand)
        })
        setFilteredBoilerParts(data)
        setBoilerParts(data) // Также устанавливаем в boilerParts для использования в getCurrentPageItems
      } else if (isPriceRangeChanged) {
        // Только фильтр по цене
        console.log('💰 Filtering by price only:', { priceStart, priceEnd })
        const data = await getFilteredCarsFx({
          priceStart,
          priceEnd,
          limit: 100,
          page: 1
        })
        console.log('📊 Filtered data received:', data)
        setFilteredBoilerParts(data)
        setBoilerParts(data) // Также устанавливаем в boilerParts для использования в getCurrentPageItems
      } else {
        // Нет фильтров - загружаем все
        console.log('📋 No filters selected, loading all cars...')
        const data = await getBoilerPartsFx('/cars/search?limit=100')
        console.log('📋 All cars result:', { count: data.count, rows: data.rows?.length })
        setBoilerParts(data)
        setFilteredBoilerParts({ count: 0, rows: [] })
      }
      
    } catch (error) {
      console.error('❌ Error applying filters:', error)
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
