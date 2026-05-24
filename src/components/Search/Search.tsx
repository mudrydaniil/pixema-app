import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery, clearCatalog } from '../../redux/slices/catalog-slice'
import { RootState } from '../../redux/store'
import s from './Search.module.scss'
import FilterIcon from '../../assets/icons/filter.svg?react'

export const Search = () => {
  const dispatch = useDispatch()
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

  return (
    <div className={s.searchWrapper}>
      <input 
        type="text" 
        placeholder="Search" 
        className={s.input} 
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />
      <button className={s.filterBtn}>
        <FilterIcon />
      </button>
    </div>
  )
}