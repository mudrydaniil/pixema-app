import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies, clearCatalog } from '../../redux/slices/catalog-slice'
import { AppDispatch, RootState } from '../../redux/store'
import { MovieCard } from '../../components/MovieCard/MovieCard'
import { MovieGrid } from '../../components/MovieGrid/MovieGrid'
import { Movie as CatalogMovie } from '../../types/movie'

export const TrendsPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  
  const { movies, total, isLoading, error } = useSelector(
    (state: RootState) => state.catalog
  )
  const [currentPage, setCurrentPage] = useState(1)

  const trendFilters = {
    order: 'NUM_VOTE' as const,
    keyword: '',
    type: 'ALL' as const,
    yearFrom: '',
    yearTo: '',
    ratingFrom: '',
    ratingTo: ''
  }

  useEffect(() => {
    setCurrentPage(1)
    dispatch(clearCatalog())
    dispatch(fetchMovies({ page: 1, filters: trendFilters }))

    return () => {
      dispatch(clearCatalog())
    }
  }, [dispatch])

  useEffect(() => {
    if (currentPage > 1) {
      dispatch(fetchMovies({ page: currentPage, filters: trendFilters }))
    }
  }, [dispatch, currentPage])

  const handleShowMore = () => {
    setCurrentPage((prevPage: number) => prevPage + 1)
  }

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      <h2 style={{ 
        color: '#ffffff', 
        fontSize: '28px', 
        fontWeight: 700, 
        marginBottom: '32px',
        marginTop: 0 
      }}>
        Тренды
      </h2>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {!isLoading && movies.length === 0 && (
        <p style={{ color: '#ffffff', textAlign: 'center', marginTop: '40px' }}>
          Популярные фильмы не найдены.
        </p>
      )}

      <MovieGrid>
        {movies.map((movie: CatalogMovie, index) => (
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
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(event) => (event.currentTarget.style.backgroundColor = '#6246ea')}
            onMouseLeave={(event) => (event.currentTarget.style.backgroundColor = '#7b61ff')}
          >
            Показать еще
          </button>
        </div>
      )}

      {isLoading && <p style={{ textAlign: 'center', color: '#ffffff', marginTop: '20px' }}>Загрузка трендов...</p>}
    </div>
  )
}