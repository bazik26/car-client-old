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
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'
import ReactPaginate from 'react-paginate'
import { IQueryParams } from '@/types/catalog'
import { useRouter } from 'next/router'
import { IBoilerParts } from '@/types/boilerparts'
import CatalogFilters from '@/components/modules/CatalogPage/CatalogFilters'
import { usePopup } from '@/hooks/usePoup'
import { checkQueryParams } from '@/utils/catalog'
import FilterSvg from '@/components/elements/FilterSvg/FilterSvg'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const mode = useStore($mode)
  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)
  const filteredBoilerParts = useStore($filteredBoilerParts)
  const boilerParts = useStore($boilerParts)
  const [spinner, setSpinner] = useState(false)
  const [priceRange, setPriceRange] = useState([1000, 9000])
  const [isFilterInQuery, setIsFilterInQuery] = useState(false)
  const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(false)
  const itemsPerPage = 20
  
  // Используем правильные данные для подсчета страниц
  const dataToUse = filteredBoilerParts?.rows?.length > 0 ? filteredBoilerParts : boilerParts
  const pagesCount = Math.ceil(dataToUse.count / itemsPerPage)
  
  // Получаем автомобили для текущей страницы
  const getCurrentPageItems = () => {
    // Используем filteredBoilerParts если есть фильтры, иначе boilerParts
    const dataToUse = filteredBoilerParts?.rows?.length > 0 ? filteredBoilerParts : boilerParts
    
    if (!dataToUse?.rows) {
      console.log('❌ No data available for pagination')
      return []
    }
    
    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const pageItems = dataToUse.rows.slice(startIndex, endIndex)
    
    console.log(`📄 Page ${currentPage + 1}: showing items ${startIndex}-${endIndex} of ${dataToUse.rows.length} total`)
    console.log('📋 Page items:', pageItems.length)
    console.log('🔍 Using data:', filteredBoilerParts?.rows?.length > 0 ? 'filtered' : 'all')
    
    return pageItems
  }
  const isValidOffset =
    query.offset && !isNaN(+query.offset) && +query.offset > 0
  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +query.offset - 1 : 0
  )
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const router = useRouter()
  const isAnyBoilerManufacturerChecked = boilerManufacturers.some(
    (item) => item.checked
  )
  const isAnyPartsManufacturerChecked = partsManufacturers.some(
    (item) => item.checked
  )
  const resetFilterBtnDisabled = !(
    isPriceRangeChanged ||
    isAnyBoilerManufacturerChecked ||
    isAnyPartsManufacturerChecked
  )
  const { toggleOpen, open, closePopup } = usePopup()

  // const resetPagination = useCallback(
  //   (data: IBoilerParts) => {
  //     setCurrentPage(0)
  //     setBoilerParts(data)
  //   },
  //   [setCurrentPage, setBoilerParts]
  // )

  const resetPagination = useCallback((data: IBoilerParts) => {
    setCurrentPage(0)
    setBoilerParts(data)
  }, [])

  const loadBoilerParts = useCallback(async () => {
    setSpinner(true)

    try {
      const offset = isValidOffset ? +query.offset - 1 : 0
      
      // Проверяем есть ли фильтры в URL
      const hasFilters = router.query.boiler || router.query.parts || router.query.priceFrom || router.query.priceTo
      
      if (hasFilters) {
        console.log('🔍 Found filters in URL, applying them...')
        
        let boilerArray: string[] = []
        const priceStart = router.query.priceFrom ? Number(router.query.priceFrom) : undefined
        const priceEnd = router.query.priceTo ? Number(router.query.priceTo) : undefined

        // Парсим выбранные бренды
        if (router.query.boiler) {
          try {
            boilerArray = JSON.parse(decodeURIComponent(String(router.query.boiler)))
            console.log('🏷️ Filtering by brands:', boilerArray)
          } catch (e) {
            console.error('Error parsing boiler filter:', e)
          }
        }

        // Если выбраны бренды, делаем несколько запросов
        if (boilerArray.length > 0) {
          const allResults = await Promise.all(
            boilerArray.map(brand => 
              getFilteredCarsFx({
                brand: brand,
                priceStart,
                priceEnd,
                limit: 100,
                page: 1
              })
            )
          )
          
          // Объединяем и удаляем дубликаты
          const combinedRows = allResults.flatMap(result => result.rows || [])
          const uniqueRows = Array.from(new Map(combinedRows.map(item => [item.id, item])).values())
          const result = {
            count: uniqueRows.length,
            rows: uniqueRows
          }
          console.log('📊 Combined filtered result:', result)
          setFilteredBoilerParts(result)
          setBoilerParts(result)
        } else if (priceStart || priceEnd) {
          // Только фильтр по цене
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
        
        // Обновляем состояние фильтров в UI
        if (router.query.boiler) {
          try {
            const boilerArray = JSON.parse(decodeURIComponent(String(router.query.boiler)))
            setBoilerManufacturers(
              boilerManufacturers.map(item => ({
                ...item,
                checked: boilerArray.includes(item.title)
              }))
            )
          } catch (e) {
            console.error('Error updating boiler manufacturers:', e)
          }
        }
        
        if (router.query.priceFrom && router.query.priceTo) {
          setPriceRange([Number(router.query.priceFrom), Number(router.query.priceTo)])
          setIsPriceRangeChanged(true)
        }
        
        setIsFilterInQuery(true)
      } else {
        // Загружаем все автомобили без фильтров
        const result = await getBoilerPartsFx('/cars/search?limit=100')
        console.log('📋 All cars result:', result)
        setBoilerParts(result)
        setFilteredBoilerParts({ count: 0, rows: [] }) // Очищаем фильтры
      }

      setCurrentPage(offset)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }, [router, query.offset, isValidOffset, isFilterInQuery])

  useEffect(() => {
    loadBoilerParts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    query.offset,
    router.query.boiler,
    router.query.parts,
    router.query.priceFrom,
    router.query.priceTo,
  ])

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      setSpinner(true)
      
      // Обновляем URL с новой страницей
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

      setCurrentPage(selected)
      
      // Пагинация теперь происходит на клиенте
      // Данные уже загружены в boilerParts, просто обновляем отображение
      
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  const resetFilters = async () => {
    try {
      setSpinner(true)
      console.log('🔄 Resetting filters...')
      const data = await getBoilerPartsFx('/cars/search?limit=100')
      console.log('📊 Reset data received:', data)
      router.push(
        {
          query: { offset: 1 },
        },
        undefined,
        { shallow: true }
      )
      setBoilerManufacturers(
        boilerManufacturers.map((item) => ({ ...item, checked: false }))
      )
      setPartsManufacturers(
        partsManufacturers.map((item) => ({ ...item, checked: false }))
      )
      setBoilerParts(data)
      setFilteredBoilerParts({ count: 0, rows: [] }) // Очищаем фильтры
      setPriceRange([1000, 9000])
      setIsPriceRangeChanged(false)
      setIsFilterInQuery(false)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>
          Витрина автомобилей
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
              setIsFilterInQuery={setIsFilterInQuery}
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
                    .filter((item) => Number(item.bestseller) !== 1) // Приводим к числу
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
