import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../redux/store'
import { 
    setIsFiltersOpen, 
    setMovieFilters, 
    resetMovieFilters, 
    fetchMovies, 
    clearCatalog 
} from '../../redux/slices/catalog-slice'
import styles from './FiltersSidebar.module.scss'

export const FiltersSidebar = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { isFiltersOpen, filters } = useSelector((state: RootState) => state.catalog)
    
    // Локальное состояние для формы внутри шторки
    const [localFilters, setLocalFilters] = useState(filters)

    // Синхронизируем локальное состояние, когда шторка открывается
    useEffect(() => {
        if (isFiltersOpen) {
            setLocalFilters(filters)
        }
    }, [isFiltersOpen, filters])

    const handleClose = () => {
        dispatch(setIsFiltersOpen(false))
    }

    const handleApply = () => {
        dispatch(setMovieFilters(localFilters))
        dispatch(clearCatalog())
        dispatch(fetchMovies({ page: 1, filters: localFilters }))
        handleClose()
    }

    const handleClear = () => {
        dispatch(resetMovieFilters())
        dispatch(clearCatalog())
        const defaultFilters = {
            order: 'RATING' as const,
            keyword: '',
            type: 'ALL' as const,
            yearFrom: '',
            yearTo: '',
            ratingFrom: '',
            ratingTo: '',
        }
        setLocalFilters(defaultFilters)
        dispatch(fetchMovies({ page: 1, filters: defaultFilters }))
        handleClose()
    }

    return (
        <>
            {/* Затемнение заднего фона */}
            <div 
                className={`${styles.overlay} ${isFiltersOpen ? styles.active : ''}`} 
                onClick={handleClose} 
            />
            
            {/* Сама боковая панель */}
            <div className={`${styles.sidebar} ${isFiltersOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <h2>Filters</h2>
                    <button className={styles.closeBtn} onClick={handleClose}>✕</button>
                </div>

                <div className={styles.scrollableContent}>
                    {/* Сортировка */}
                    <div className={styles.filterGroup}>
                        <label>Sort by</label>
                        <div className={styles.toggleGroup}>
                            <button 
                                type="button"
                                className={localFilters.order === 'RATING' ? styles.active : ''}
                                onClick={() => setLocalFilters({ ...localFilters, order: 'RATING' })}
                            >
                                Rating
                            </button>
                            <button 
                                type="button"
                                className={localFilters.order === 'YEAR' ? styles.active : ''}
                                onClick={() => setLocalFilters({ ...localFilters, order: 'YEAR' })}
                            >
                                Year
                            </button>
                        </div>
                    </div>

                    {/* Поиск по названию внутри фильтров */}
                    <div className={styles.filterGroup}>
                        <label>Full or short movie name</label>
                        <input 
                            type="text" 
                            className={styles.input}
                            placeholder="Your text"
                            value={localFilters.keyword}
                            onChange={(e) => setLocalFilters({ ...localFilters, keyword: e.target.value })}
                        />
                    </div>

                    {/* Тип */}
                    <div className={styles.filterGroup}>
                        <label>Type</label>
                        <select 
                            className={styles.select}
                            value={localFilters.type}
                            onChange={(e) => setLocalFilters({ ...localFilters, type: e.target.value as any })}
                        >
                            <option value="ALL">All</option>
                            <option value="FILM">Movie</option>
                            <option value="TV_SERIES">Series</option>
                            <option value="MINI_SERIES">Mini Series</option>
                        </select>
                    </div>

                    {/* Года (Диапазон) */}
                    <div className={styles.filterGroup}>
                        <label>Years</label>
                        <div className={styles.rangeInputs}>
                            <input 
                                type="number" 
                                placeholder="From" 
                                className={styles.input}
                                value={localFilters.yearFrom}
                                onChange={(e) => setLocalFilters({ ...localFilters, yearFrom: e.target.value })}
                            />
                            <input 
                                type="number" 
                                placeholder="To" 
                                className={styles.input}
                                value={localFilters.yearTo}
                                onChange={(e) => setLocalFilters({ ...localFilters, yearTo: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Рейтинг (Диапазон) */}
                    <div className={styles.filterGroup}>
                        <label>Rating</label>
                        <div className={styles.rangeInputs}>
                            <input 
                                type="number" 
                                placeholder="From" 
                                className={styles.input}
                                value={localFilters.ratingFrom}
                                onChange={(e) => setLocalFilters({ ...localFilters, ratingFrom: e.target.value })}
                            />
                            <input 
                                type="number" 
                                placeholder="To" 
                                className={styles.input}
                                value={localFilters.ratingTo}
                                onChange={(e) => setLocalFilters({ ...localFilters, ratingTo: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Подвал с действиями */}
                <div className={styles.footer}>
                    <button type="button" className={styles.clearBtn} onClick={handleClear}>
                        Clear filter
                    </button>
                    <button type="button" className={styles.submitBtn} onClick={handleApply}>
                        Show results
                    </button>
                </div>
            </div>
        </>
    )
}