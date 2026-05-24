import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies, searchMovies } from '../../redux/slices/catalog-slice'
import { AppDispatch, RootState } from '../../redux/store'
import { MovieCard } from '../../components/MovieCard/MovieCard'
import { MovieGrid } from '../../components/MovieGrid/MovieGrid'
import { Filters } from '../../components/Filters/Filters' // Импортируем фильтры

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { movies, total, isLoading, error, searchQuery, filters } = useSelector(
    (state: RootState) => state.catalog
  )
  const [currentPage, setCurrentPage] = useState(1)

  // При изменении поисковой строки ИЛИ фильтров — сбрасываем пагинацию на 1 страницу
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, filters])

  useEffect(() => {
    if (searchQuery.trim()) {
      dispatch(searchMovies({ keyword: searchQuery, page: currentPage }))
    } else {
      // Передаем и страницу, и текущие фильтры в Thunk
      dispatch(fetchMovies({ page: currentPage, filters }))
    }
  }, [dispatch, currentPage, searchQuery, filters])

  const handleShowMore = () => {
    setCurrentPage((prev) => prev + 1)
  }

  return (
    <>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      
      {/* Рендерим панель фильтров над сеткой */}
      <Filters />

      {!isLoading && movies.length === 0 && searchQuery && (
        <p style={{ color: '#fff', textAlign: 'center', marginTop: '40px' }}>
          No movies found for "{searchQuery}"
        </p>
      )}

      {/* Если фильмов нет при выбранных фильтрах */}
      {!isLoading && movies.length === 0 && !searchQuery && (
        <p style={{ color: '#fff', textAlign: 'center', marginTop: '40px' }}>
          No results match the selected filters.
        </p>
      )}

      <MovieGrid>
        {movies.map((movie, index) => (
          <MovieCard key={`${movie.kinopoiskId}-${index}`} movie={movie} />
        ))}
      </MovieGrid>

      {!isLoading && movies.length > 0 && movies.length < total && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', width: '100%' }}>
          <button 
            onClick={handleShowMore}
            style={{
              padding: '10px 24px',
              backgroundColor: '#7b61ff',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Show more
          </button>
        </div>
      )}

      {isLoading && <p style={{ textAlign: 'center', color: '#fff', marginTop: '20px' }}>Loading...</p>}
    </>
  )
}