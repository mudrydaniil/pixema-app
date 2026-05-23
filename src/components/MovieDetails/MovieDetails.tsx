import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { MovieCard } from '../MovieCard/MovieCard'
import styles from './MovieDetails.module.scss'

import 'swiper/css'

interface MovieDetailsProps {
  movie: any
  staff: any[]
  similarMovies: any[]
  boxOffice: any[]
}

export const MovieDetails = ({ movie, staff, similarMovies, boxOffice }: MovieDetailsProps): React.ReactElement => {
  const swiperRef = useRef<any>(null)

  const directors = staff
    ?.filter(p => p.professionKey === 'DIRECTOR')
    .slice(0, 2)
    .map(p => p.nameRu || p.nameEn)
    .join(', ') || '-'

  const actors = staff
    ?.filter(p => p.professionKey === 'ACTOR')
    .slice(0, 3)
    .map(p => p.nameRu || p.nameEn)
    .join(', ') || '-'

  const writers = staff
    ?.filter(p => p.professionKey === 'WRITER')
    .slice(0, 2)
    .map(p => p.nameRu || p.nameEn)
    .join(', ') || '-'

  const producers = staff
    ?.filter(p => p.professionKey === 'PRODUCER')
    .slice(0, 3)
    .map(p => p.nameRu || p.nameEn)
    .join(', ') || '-'

  const boxOfficeItem = boxOffice?.find(item => item.type === 'BUDGET' || item.type === 'WORLD')
  const formattedBoxOffice = boxOfficeItem
    ? `${boxOfficeItem.symbol || '$'}${boxOfficeItem.amount.toLocaleString('en-US')}`
    : '$381,409,310'

  const releaseYear = movie.year || '-'
  const movieTitle = movie.nameRu || movie.nameOriginal || movie.nameEn || 'Untitled'
  const movieDescription = movie.description || movie.shortDescription || 'No description available.'

  return (
    <div className={styles.wrapper}>
      <div className={styles.movieContainer}>
        
        {/* Левая колонка */}
        <div className={styles.leftColumn}>
          <div className={styles.posterWrapper}>
            <img 
              src={movie.posterUrl || movie.posterUrlPreview} 
              alt={movieTitle} 
              className={styles.poster} 
            />
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.btnAction} aria-label="Add to favorites">
              <span className={styles.icon}>🔖</span>
            </button>
            <button className={styles.btnAction} aria-label="Share movie">
              <span className={styles.icon}>🔗</span>
            </button>
          </div>
        </div>

        {/* Правая колонка */}
        <div className={styles.rightColumn}>
          <p className={styles.genres}>
            {movie.genres?.map((g: any) => g.genre).join(' • ') || 'Movie Genres'}
          </p>
          
          <h1 className={styles.title}>{movieTitle}</h1>

          <div className={styles.badges}>
            <span className={styles.ratingKp}>{movie.ratingKinopoisk || 'N/A'}</span>
            <span className={styles.ratingImdb}>IMDb {movie.ratingImdb || 'N/A'}</span>
            <span className={styles.runtime}>{movie.filmLength ? `${movie.filmLength} min` : '-'}</span>
          </div>

          <p className={styles.description}>{movieDescription}</p>

          <table className={styles.infoTable}>
            <tbody>
              <tr>
                <td>Year</td>
                <td>{releaseYear}</td>
              </tr>
              <tr>
                <td>Released</td>
                <td>{movie.year ? `15 Jul ${movie.year}` : '-'}</td>
              </tr>
              <tr>
                <td>BoxOffice</td>
                <td>{formattedBoxOffice}</td>
              </tr>
              <tr>
                <td>Country</td>
                <td>{movie.countries?.map((c: any) => c.country).join(', ') || '-'}</td>
              </tr>
              <tr>
                <td>Production</td>
                <td>{producers}</td>
              </tr>
              <tr>
                <td>Actors</td>
                <td>{actors}</td>
              </tr>
              <tr>
                <td>Director</td>
                <td>{directors}</td>
              </tr>
              <tr>
                <td>Writers</td>
                <td>{writers}</td>
              </tr>
            </tbody>
          </table>

          {/* Блок рекомендаций */}
          {similarMovies && similarMovies.length > 0 && (
            <div className={styles.recommendations}>
              <div className={styles.recHeader}>
                <h2 className={styles.recTitle}>Recommendations</h2>
                <div className={styles.recArrows}>
                  <button onClick={() => swiperRef.current?.slidePrev()} className={styles.arrowBtn} aria-label="Previous items">←</button>
                  <button onClick={() => swiperRef.current?.slideNext()} className={styles.arrowBtn} aria-label="Next items">→</button>
                </div>
              </div>
              
              <div className={styles.sliderContainer}>
                <Swiper
                  modules={[Navigation]}
                  onBeforeInit={(swiper) => {
                    swiperRef.current = swiper
                  }}
                  spaceBetween={24}
                  slidesPerView={4}          // Ровно 4 видимые карточки в ряд
                  slidesPerGroup={1}         // Перелистывание ровно по одной карточке
                  watchSlidesProgress={true} // Предотвращает баги отображения краев слайдов
                  grabCursor={true}
                  className={styles.swiperRoot}
                >
                  {similarMovies.map((simMovie, index) => {
                    const uniqueId = simMovie.filmId || simMovie.kinopoiskId || index
                    
                    const formattedMovie = {
                      ...simMovie,
                      kinopoiskId: uniqueId,
                      genres: simMovie.genres || movie.genres 
                    }

                    return (
                      <SwiperSlide key={uniqueId} className={styles.swiperSlideItem}>
                        <MovieCard movie={formattedMovie} />
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}