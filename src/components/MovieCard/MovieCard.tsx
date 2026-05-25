import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorite } from '../../redux/slices/favorites-slice'
import { RootState } from '../../redux/store'
import { Movie } from '../../types/movie'
import styles from './MovieCard.module.scss'
import BookmarkIcon from '../../assets/icons/favorites.svg?react'

interface MovieCardProps {
  movie: Movie
}

export const MovieCard = ({ movie }: MovieCardProps): React.ReactElement => {
  const dispatch = useDispatch()
  
  const movieId = movie.kinopoiskId || (movie as any).filmId
  const title = movie.nameRu || movie.nameOriginal || 'Без названия'
  const genre = movie.genres?.[0]?.genre || ''

  const isFavorite = useSelector((state: RootState) =>
    state.favorites.favorites.some((movieItem) => movieItem.kinopoiskId === movieId)
  )

  const handleFavoriteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    dispatch(toggleFavorite(movie))
  }

  return (
    <Link to={`/movie/${movieId}`} className={styles.card}>
      <div className={styles.posterWrapper}>
        <img
          src={movie.posterUrlPreview}
          alt={title}
          className={styles.poster}
        />
        
        {movie.ratingKinopoisk && (
          <div className={styles.rating}>
            {movie.ratingKinopoisk}
          </div>
        )}

        <button 
          type='button' 
          className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
          <BookmarkIcon />
        </button>
      </div>
      
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.meta}>
          {movie.year ? `${movie.year} • ` : ''}{genre}
        </p>
      </div>
    </Link>
  )
}