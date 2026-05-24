import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../redux/store'
import { setMovieFilters, MovieFilters } from '../../redux/slices/catalog-slice'

export const Filters = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { filters, searchQuery } = useSelector((state: RootState) => state.catalog)

  // Генерируем массив годов от текущего обратно до 1960
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1960 + 1 }, (_, i) => String(currentYear - i))

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setMovieFilters({ type: e.target.value as MovieFilters['type'] }))
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setMovieFilters({ year: e.target.value }))
  }

  // Если пользователь что-то ищет через поисковую строку, блокируем фильтры
  if (searchQuery.trim()) return null

  return (
    <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
      {/* Фильтр по типу */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ color: '#7e7e82', fontSize: '14px', fontWeight: 500 }}>Type</label>
        <select
          value={filters.type}
          onChange={handleTypeChange}
          style={selectStyle}
        >
          <option value="ALL">All</option>
          <option value="FILM">Movies</option>
          <option value="TV_SERIES">TV Series</option>
          <option value="MINI_SERIES">Mini Series</option>
          <option value="TV_SHOW">TV Shows</option>
        </select>
      </div>

      {/* Фильтр по годам */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ color: '#7e7e82', fontSize: '14px', fontWeight: 500 }}>Year</label>
        <select
          value={filters.year}
          onChange={handleYearChange}
          style={selectStyle}
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

const selectStyle: React.CSSProperties = {
  padding: '10px 16px',
  backgroundColor: '#242426',
  color: '#fff',
  border: '1px solid #323234',
  borderRadius: '10px',
  outline: 'none',
  fontSize: '14px',
  fontWeight: 500,
  minWidth: '160px',
  cursor: 'pointer',
}