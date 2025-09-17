import { getBoilerPartsFx } from '@/app/api/boilerParts'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock'
import {
  $boilerManufacturers,
  $boilerParts,
  $filteredBoilerParts,
  $partsManufacturers,
  setBoilerManufacturers,
  setBoilerParts,
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
  const pagesCount = Math.ceil(boilerParts.count / itemsPerPage)
  
  // Получаем автомобили для текущей страницы
  const getCurrentPageItems = () => {
    if (!boilerParts?.rows) {
      console.log('❌ No boilerParts.rows available')
      return []
    }
    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const pageItems = boilerParts.rows.slice(startIndex, endIndex)
    console.log(`📄 Page ${currentPage + 1}: showing items ${startIndex}-${endIndex} of ${boilerParts.rows.length} total`)
    console.log('📋 Page items:', pageItems.length)
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
      const filterParams = new URLSearchParams()

      if (isFilterInQuery) {
        if (router.query.boiler) {
          filterParams.append('boiler', String(router.query.boiler))
        }
        if (router.query.parts) {
          filterParams.append('parts', String(router.query.parts))
        }
        if (router.query.priceFrom && router.query.priceTo) {
          filterParams.append('priceFrom', String(router.query.priceFrom))
          filterParams.append('priceTo', String(router.query.priceTo))
        }
      }

      const queryString = filterParams.toString()
      // Загружаем больше автомобилей за раз, так как API не поддерживает offset
      const result = await getBoilerPartsFx(
        `/cars/search?limit=100${
          queryString ? `&${queryString}` : ''
        }`
      )

      console.log('📋 CatalogPage loadBoilerParts result:', result)
      console.log('📊 Result count:', result.count, 'rows:', result.rows?.length)

      setCurrentPage(offset)
      setBoilerParts(result) // Обновляем состояние каталога
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
