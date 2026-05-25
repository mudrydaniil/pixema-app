import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies, searchMovies } from '../../redux/slices/catalog-slice'
import { AppDispatch, RootState } from '../../redux/store'
import { MovieCard } from '../../components/MovieCard/MovieCard'
import { MovieGrid } from '../../components/MovieGrid/MovieGrid'
import { FiltersSidebar } from '../../components/FiltersSidebar/FiltersSidebar'

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { movies, total, isLoading, error, searchQuery, filters } = useSelector(
    (state: RootState) => state.catalog
  )
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, filters])

  useEffect(() => {
    if (searchQuery.trim()) {
      dispatch(searchMovies({ keyword: searchQuery, page: currentPage }))
    } else {
      dispatch(fetchMovies({ page: currentPage, filters }))
    }
  }, [dispatch, currentPage, searchQuery, filters])

  const handleShowMore = () => {
    setCurrentPage((prevPage: number) => prevPage + 1)
  }

  return (
    <>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <FiltersSidebar />

      {!isLoading && movies.length === 0 && (
        <p style={{ color: '#ffffff', textAlign: 'center', marginTop: '40px' }}>
          Нет результатов, соответствующих выбранным критериям.
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
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Показать еще
          </button>
        </div>
      )}

      {isLoading && <p style={{ textAlign: 'center', color: '#ffffff', marginTop: '20px' }}>Загрузка...</p>}
    </>
  )
}