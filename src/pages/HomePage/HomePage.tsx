import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies, searchMovies } from '../../redux/slices/catalog-slice'
import { AppDispatch, RootState } from '../../redux/store'
import { MovieCard } from '../../components/MovieCard/MovieCard'

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, total, isLoading, error, searchQuery } = useSelector((state: RootState) => state.catalog);
  const [currentPage, setCurrentPage] = useState(1);

  // При изменении поисковой строки всегда сбрасываем пагинацию на первую страницу
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Запрос данных в зависимости от режима (поиск или каталог)
  useEffect(() => {
    if (searchQuery.trim()) {
      dispatch(searchMovies({ keyword: searchQuery, page: currentPage }));
    } else {
      dispatch(fetchMovies(currentPage));
    }
  }, [dispatch, currentPage, searchQuery]);

  const handleShowMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="home-page">
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      
      {!isLoading && movies.length === 0 && searchQuery && (
        <p style={{ color: '#fff', textAlign: 'center', marginTop: '40px' }}>
          No movies found for "{searchQuery}"
        </p>
      )}

      <div className="movie-grid">
        {movies.map((movie, index) => (
          // Ошибка типизации исправлена: filmId удален, данные нормализованы в Redux
          <MovieCard key={`${movie.kinopoiskId}-${index}`} movie={movie} />
        ))}
      </div>

      {/* Кнопка показывается только если загружены не все доступные элементы */}
      {!isLoading && movies.length > 0 && movies.length < total && (
        <div className="pagination-wrapper">
          <button className="show-more" onClick={handleShowMore}>
            Show more
          </button>
        </div>
      )}

      {isLoading && <p style={{ textAlign: 'center', color: '#fff', marginTop: '20px' }}>Loading...</p>}
    </div>
  );
};