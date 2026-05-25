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
    
    const [localFilters, setLocalFilters] = useState(filters)

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
            <div 
                className={`${styles.overlay} ${isFiltersOpen ? styles.active : ''}`} 
                onClick={handleClose} 
            />
            
            <div className={`${styles.sidebar} ${isFiltersOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <h2>Фильтры</h2>
                    <button className={styles.closeBtn} onClick={handleClose}>✕</button>
                </div>

                <div className={styles.scrollableContent}>
                    <div className={styles.filterGroup}>
                        <label>Сортировать по</label>
                        <div className={styles.toggleGroup}>
                            <button 
                                type="button"
                                className={localFilters.order === 'RATING' ? styles.active : ''}
                                onClick={() => setLocalFilters({ ...localFilters, order: 'RATING' })}
                            >
                                Рейтингу
                            </button>
                            <button 
                                type="button"
                                className={localFilters.order === 'YEAR' ? styles.active : ''}
                                onClick={() => setLocalFilters({ ...localFilters, order: 'YEAR' })}
                            >
                                Году выпуска
                            </button>
                        </div>
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Полное или краткое название</label>
                        <input 
                            type="text" 
                            className={styles.input}
                            placeholder="Введите текст"
                            value={localFilters.keyword}
                            onChange={(event) => setLocalFilters({ ...localFilters, keyword: event.target.value })}
                        />
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Тип контента</label>
                        <select 
                            className={styles.select}
                            value={localFilters.type}
                            onChange={(event) => setLocalFilters({ ...localFilters, type: event.target.value as any })}
                        >
                            <option value="ALL">Все</option>
                            <option value="FILM">Фильмы</option>
                            <option value="TV_SERIES">Сериалы</option>
                            <option value="MINI_SERIES">Мини-сериалы</option>
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Года выхода</label>
                        <div className={styles.rangeInputs}>
                            <input 
                                type="number" 
                                placeholder="От" 
                                className={styles.input}
                                value={localFilters.yearFrom}
                                onChange={(event) => setLocalFilters({ ...localFilters, yearFrom: event.target.value })}
                            />
                            <input 
                                type="number" 
                                placeholder="До" 
                                className={styles.input}
                                value={localFilters.yearTo}
                                onChange={(event) => setLocalFilters({ ...localFilters, yearTo: event.target.value })}
                            />
                        </div>
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Рейтинг</label>
                        <div className={styles.rangeInputs}>
                            <input 
                                type="number" 
                                placeholder="От" 
                                className={styles.input}
                                value={localFilters.ratingFrom}
                                onChange={(event) => setLocalFilters({ ...localFilters, ratingFrom: event.target.value })}
                            />
                            <input 
                                type="number" 
                                placeholder="До" 
                                className={styles.input}
                                value={localFilters.ratingTo}
                                onChange={(event) => setLocalFilters({ ...localFilters, ratingTo: event.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <button type="button" className={styles.clearBtn} onClick={handleClear}>
                        Очистить фильтр
                    </button>
                    <button type="button" className={styles.submitBtn} onClick={handleApply}>
                        Показать результаты
                    </button>
                </div>
            </div>
        </>
    )
}