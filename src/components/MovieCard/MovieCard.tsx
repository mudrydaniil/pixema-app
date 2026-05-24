import { Link } from 'react-router-dom'
import { Movie } from '../../types/movie'
import styles from './MovieCard.module.scss'

interface MovieCardProps {
  movie: Movie
}

export const MovieCard = ({ movie }: MovieCardProps): React.ReactElement => {
  const movieId = movie.kinopoiskId || (movie as any).filmId;
  const title = movie.nameRu || movie.nameOriginal || 'No title'
  const genre = movie.genres?.[0]?.genre || ''

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