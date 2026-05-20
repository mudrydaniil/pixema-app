import { Link } from 'react-router-dom'
import { Movie } from '../../types/movie'
import styles from './MovieCard.module.scss'

interface MovieCardProps {
  movie: Movie
}

export const MovieCard = ({ movie }: MovieCardProps): React.ReactElement => {
  const title = movie.nameRu || movie.nameOriginal || 'No title'

  return (
    <Link to={`/movie/${movie.kinopoiskId}`} className={styles.card}>
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
          {movie.year} • {movie.genres?.[0]?.genre}
        </p>
      </div>
    </Link>
  )
}