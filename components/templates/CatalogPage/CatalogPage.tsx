import { getBoilerPartsFx, getFilteredCarsFx } from '@/app/api/boilerParts'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock'
import {
  $boilerManufacturers,
  $boilerParts,
  $filteredBoilerParts,
  $partsManufacturers,
  setBoilerManufacturers,
  setBoilerParts,
  setFilteredBoilerParts,
  setPartsManufacturers,
  updateBoilerManufacturer,
  updatePartsManufacturer,
} from '@/context/boilerParts'
import { $mode } from '@/context/mode'
import styles from '@/styles/catalog/index.module.scss'
import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useState, useMemo, useRef } from 'react'
import { toast } from 'react-toastify'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'
import ReactPaginate from 'react-paginate'
import { IQueryParams } from '@/types/catalog'
import { useRouter } from 'next/router'
import CatalogFilters from '@/components/modules/CatalogPage/CatalogFilters'
import { usePopup } from '@/hooks/usePoup'
import FilterSvg from '@/components/elements/FilterSvg/FilterSvg'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const mode = useStore($mode)
  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)
  const filteredBoilerParts = useStore($filteredBoilerParts)
  const boilerParts = useStore($boilerParts)
  const [spinner, setSpinner] = useState(false)
  const [priceRange, setPriceRange] = useState([1000, 9000])
  const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(false)
  const itemsPerPage = 20
  
  const isValidOffset =
    query.offset && !isNaN(+query.offset) && +query.offset > 0
  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +query.offset - 1 : 0
  )
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const router = useRouter()
  const { toggleOpen, open, closePopup } = usePopup()

  // Вычисляем выбранные бренды из состояния
  const selectedBrands = useMemo(() => {
    return boilerManufacturers
      .filter((item) => item.checked)
      .map((item) => item.title)
  }, [boilerManufacturers])

  // Вычисляем есть ли активные фильтры
  const hasActiveFilters = useMemo(() => {
    return selectedBrands.length > 0 || isPriceRangeChanged
  }, [selectedBrands, isPriceRangeChanged])

  // Используем правильные данные для подсчета страниц
  const dataToUse = filteredBoilerParts?.rows?.length > 0 ? filteredBoilerParts : boilerParts
  const pagesCount = Math.ceil(dataToUse.count / itemsPerPage)
  
  // Получаем автомобили для текущей страницы
  const getCurrentPageItems = () => {
    const dataToUse = filteredBoilerParts?.rows?.length > 0 ? filteredBoilerParts : boilerParts
    
    if (!dataToUse?.rows || dataToUse.rows.length === 0) {
      return []
    }
    
    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return dataToUse.rows.slice(startIndex, endIndex)
  }

  const isAnyBoilerManufacturerChecked = selectedBrands.length > 0
  const isAnyPartsManufacturerChecked = partsManufacturers.some(
    (item) => item.checked
  )
  const resetFilterBtnDisabled = !(
    isPriceRangeChanged ||
    isAnyBoilerManufacturerChecked ||
    isAnyPartsManufacturerChecked
  )

  // Основная функция загрузки данных с фильтрами
  const loadCarsWithFilters = useCallback(async () => {
    setSpinner(true)

    try {
      const priceStart = isPriceRangeChanged ? Math.ceil(priceRange[0]) : undefined
      const priceEnd = isPriceRangeChanged ? Math.ceil(priceRange[1]) : undefined

      console.log('🔄 loadCarsWithFilters called', {
        selectedBrands,
        priceStart,
        priceEnd,
        hasActiveFilters
      })

      if (hasActiveFilters) {
        // Есть активные фильтры - применяем их
        if (selectedBrands.length > 0) {
          console.log(`🚀 Making ${selectedBrands.length} requests for brands:`, selectedBrands)
          
          const allResults = await Promise.all(
            selectedBrands.map(async (brand) => {
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
          const result = {
            count: uniqueRows.length,
            rows: uniqueRows
          }
          console.log('📊 Combined filtered result:', {
            totalRows: result.rows.length,
            brands: selectedBrands
          })
          setFilteredBoilerParts(result)
          setBoilerParts(result)
        } else if (isPriceRangeChanged) {
          // Только фильтр по цене
          console.log('💰 Filtering by price only:', { priceStart, priceEnd })
          const result = await getFilteredCarsFx({
            priceStart,
            priceEnd,
            limit: 100,
            page: 1
          })
          console.log('📊 Filtered result:', result)
          setFilteredBoilerParts(result)
          setBoilerParts(result)
        }
      } else {
        // Нет активных фильтров - загружаем все машины
        console.log('📋 No active filters, loading all cars...')
        const result = await getBoilerPartsFx('/cars/search?limit=100')
        console.log('📋 All cars result:', { count: result.count, rows: result.rows?.length })
        setBoilerParts(result)
        setFilteredBoilerParts({ count: 0, rows: [] })
      }

      setCurrentPage(0) // Сбрасываем на первую страницу при изменении фильтров
    } catch (error) {
      console.error('❌ Error in loadCarsWithFilters:', error)
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }, [selectedBrands, priceRange, isPriceRangeChanged, hasActiveFilters])

  // Автоматически загружаем данные при изменении фильтров с debounce
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  
  useEffect(() => {
    // Очищаем предыдущий таймер
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Устанавливаем новый таймер
    debounceTimerRef.current = setTimeout(() => {
      console.log('🔄 Filters changed, loading cars...', {
        selectedBrands,
        isPriceRangeChanged,
        hasActiveFilters
      })
      loadCarsWithFilters()
    }, 300) // Debounce 300ms как в car-client

    // Очистка при размонтировании
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBrands.length, selectedBrands.join(','), isPriceRangeChanged, priceRange[0], priceRange[1]])

  // Загружаем данные при первой загрузке страницы
  useEffect(() => {
    if (!hasActiveFilters && boilerParts.rows?.length === 0) {
      console.log('📋 Initial load - no filters, loading all cars...')
      loadCarsWithFilters()
    }
  }, [])

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected)
    // Обновляем URL для истории браузера (но не как источник данных)
    router.push(
      {
        query: {
          ...router.query,
          offset: selected + 1,
        },
      },
      undefined,
      { shallow: true }
    )
  }

  const resetFilters = async () => {
    try {
      setSpinner(true)
      console.log('🔄 Resetting filters...')
      
      // Сбрасываем состояние фильтров
      setBoilerManufacturers(
        boilerManufacturers.map((item) => ({ ...item, checked: false }))
      )
      setPartsManufacturers(
        partsManufacturers.map((item) => ({ ...item, checked: false }))
      )
      setPriceRange([1000, 9000])
      setIsPriceRangeChanged(false)
      
      // Загружаем все машины
      const data = await getBoilerPartsFx('/cars/search?limit=100')
      console.log('📊 Reset data received:', data)
      setBoilerParts(data)
      setFilteredBoilerParts({ count: 0, rows: [] })
      
      // Обновляем URL
      router.push(
        {
          query: { offset: 1 },
        },
        undefined,
        { shallow: true }
      )
      
      setCurrentPage(0)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <section className={styles.catalog} aria-labelledby="catalog-heading">
      <div className={`container ${styles.catalog__container}`}>
        <h2 id="catalog-heading" className={`${styles.catalog__title} ${darkModeClass}`}>
          Каталог автомобилей из Канады
        </h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          <AnimatePresence>
            {isAnyBoilerManufacturerChecked && (
              <ManufacturersBlock
                title="Марка авто"
                event={updateBoilerManufacturer}
                manufacturersList={boilerManufacturers}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isAnyPartsManufacturerChecked && (
              <ManufacturersBlock
                title="Страна"
                event={updatePartsManufacturer}
                manufacturersList={partsManufacturers}
              />
            )}
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button
              className={`${styles.catalog__top__reset} ${darkModeClass}`}
              disabled={resetFilterBtnDisabled}
              onClick={resetFilters}
            >
              Сбросить фильтр
            </button>
            <button
              className={styles.catalog__top__mobile_btn}
              onClick={toggleOpen}
            >
              <span className={styles.catalog__top__mobile_btn__svg}>
                <FilterSvg />
              </span>
              <span className={styles.catalog__top__mobile_btn__text}>
                Фильтр
              </span>
            </button>
            <FilterSelect setSpinner={setSpinner} />
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <CatalogFilters
              priceRange={priceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
              setPriceRange={setPriceRange}
              resetFilterBtnDisabled={resetFilterBtnDisabled}
              resetFilters={resetFilters}
              isPriceRangeChanged={isPriceRangeChanged}
              currentPage={currentPage}
              setIsFilterInQuery={() => {}}
              closePopup={closePopup}
              filtersMobileOpen={open}
            />
            {spinner ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(20)).map((_, i) => (
                  <li
                    key={i}
                    className={`${skeletonStyles.skeleton__item} ${
                      mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
                    }`}
                  >
                    <div className={skeletonStyles.skeleton__item__light} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={styles.catalog__list}>
                {getCurrentPageItems().length > 0 ? (
                  getCurrentPageItems()
                    .filter((item) => Number(item.bestseller) !== 1)
                    .map((item) => <CatalogItem item={item} key={item.id} />)
                ) : (
                  <span>Список товаров пуст...</span>
                )}
              </ul>
            )}
          </div>
          <ReactPaginate
            containerClassName={styles.catalog__bottom__list}
            pageClassName={styles.catalog__bottom__list__item}
            pageLinkClassName={styles.catalog__bottom__list__item__link}
            previousClassName={styles.catalog__bottom__list__prev}
            nextClassName={styles.catalog__bottom__list__next}
            breakClassName={styles.catalog__bottom__list__break}
            breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
            breakLabel="..."
            pageCount={pagesCount}
            forcePage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
