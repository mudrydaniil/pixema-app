import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery, clearCatalog, setIsFiltersOpen } from '../../redux/slices/catalog-slice'
import { RootState, AppDispatch } from '../../redux/store'
import styles from './Search.module.scss'
import FilterIcon from '../../assets/icons/filter.svg?react'

export const Search = () => {
  const dispatch = useDispatch<AppDispatch>()
  const searchQuery = useSelector((state: RootState) => state.catalog.searchQuery)
  const [localValue, setLocalValue] = useState(searchQuery)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== searchQuery) {
        dispatch(clearCatalog())
        dispatch(setSearchQuery(localValue))
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [localValue, dispatch, searchQuery])

  useEffect(() => {
    setLocalValue(searchQuery)
  }, [searchQuery])

  const handleOpenFilters = () => {
    dispatch(setIsFiltersOpen(true))
  }

  return (
    <div className={styles.searchWrapper}>
      <input 
        type='text' 
        placeholder='Поиск' 
        className={styles.input} 
        value={localValue}
        onChange={(event) => setLocalValue(event.target.value)}
      />
      <button 
        type='button' 
        className={styles.filterBtn} 
        onClick={handleOpenFilters}
        title='Открыть фильтры'
      >
        <FilterIcon />
      </button>
    </div>
  )
}