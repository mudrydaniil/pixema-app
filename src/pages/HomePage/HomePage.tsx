import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../../redux/slices/catalog-slice'
import { AppDispatch, RootState } from '../../redux/store'
import { MovieCard } from '../../components/MovieCard/MovieCard'

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, isLoading, error } = useSelector((state: RootState) => state.catalog);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchMovies(currentPage));
  }, [dispatch, currentPage]);

  const handleShowMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="home-page">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.kinopoiskId} movie={movie} />
        ))}
      </div>

      {!isLoading && movies.length > 0 && (
        <div className="pagination-wrapper">
          <button className="show-more" onClick={handleShowMore}>
            Show more
          </button>
        </div>
      )}

      {isLoading && <p style={{ textAlign: 'center', color: '#fff' }}>Loading...</p>}
    </div>
  );
};