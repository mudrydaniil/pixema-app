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
    ?.filter(person => person.professionKey === 'DIRECTOR')
    .slice(0, 2)
    .map(person => person.nameRu || person.nameEn)
    .join(', ') || '-'

  const actors = staff
    ?.filter(person => person.professionKey === 'ACTOR')
    .slice(0, 3)
    .map(person => person.nameRu || person.nameEn)
    .join(', ') || '-'

  const writers = staff
    ?.filter(person => person.professionKey === 'WRITER')
    .slice(0, 2)
    .map(person => person.nameRu || person.nameEn)
    .join(', ') || '-'

  const producers = staff
    ?.filter(person => person.professionKey === 'PRODUCER')
    .slice(0, 3)
    .map(person => person.nameRu || person.nameEn)
    .join(', ') || '-'

  const boxOfficeItem = boxOffice?.find(boxOfficeItemElement => boxOfficeItemElement.type === 'BUDGET' || boxOfficeItemElement.type === 'WORLD')
  const formattedBoxOffice = boxOfficeItem
    ? `${boxOfficeItem.symbol || '$'}${boxOfficeItem.amount.toLocaleString('ru-RU')}`
    : '-'

  const releaseYear = movie.year || '-'
  const movieTitle = movie.nameRu || movie.nameOriginal || movie.nameEn || 'Без названия'
  const movieDescription = movie.description || movie.shortDescription || 'Описание отсутствует.'

  return (
    <div className={styles.wrapper}>
      <div className={styles.movieContainer}>
        
        <div className={styles.leftColumn}>
          <div className={styles.posterWrapper}>
            <img 
              src={movie.posterUrl || movie.posterUrlPreview} 
              alt={movieTitle} 
              className={styles.poster} 
            />
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.btnAction} aria-label='Добавить в избранное'>
              <span className={styles.icon}>🔖</span>
            </button>
            <button className={styles.btnAction} aria-label='Поделиться фильмом'>
              <span className={styles.icon}>🔗</span>
            </button>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <p className={styles.genres}>
            {movie.genres?.map((genreItem: any) => genreItem.genre).join(' • ') || 'Жанры'}
          </p>
          
          <h1 className={styles.title}>{movieTitle}</h1>

          <div className={styles.badges}>
            {movie.ratingKinopoisk && <span className={styles.ratingKp}>{movie.ratingKinopoisk}</span>}
            {movie.ratingImdb && <span className={styles.ratingImdb}>IMDb {movie.ratingImdb}</span>}
            <span className={styles.runtime}>{movie.filmLength ? `${movie.filmLength} мин` : '-'}</span>
          </div>

          <p className={styles.description}>{movieDescription}</p>

          <table className={styles.infoTable}>
            <tbody>
              <tr>
                <td>Год производства</td>
                <td>{releaseYear}</td>
              </tr>
              <tr>
                <td>Релиз</td>
                <td>{movie.year ? `15 июля ${movie.year}` : '-'}</td>
              </tr>
              <tr>
                <td>Бюджет / Сборы</td>
                <td>{formattedBoxOffice}</td>
              </tr>
              <tr>
                <td>Страна</td>
                <td>{movie.countries?.map((countryItem: any) => countryItem.country).join(', ') || '-'}</td>
              </tr>
              <tr>
                <td>Продюсеры</td>
                <td>{producers}</td>
              </tr>
              <tr>
                <td>В главных ролях</td>
                <td>{actors}</td>
              </tr>
              <tr>
                <td>Режиссеры</td>
                <td>{directors}</td>
              </tr>
              <tr>
                <td>Сценаристы</td>
                <td>{writers}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {similarMovies && similarMovies.length > 0 && (
        <div className={styles.recommendations}>
          <div className={styles.recHeader}>
            <h2 className={styles.recTitle}>Рекомендации</h2>
            <div className={styles.recArrows}>
              <button onClick={() => swiperRef.current?.slidePrev()} className={styles.arrowBtn}>←</button>
              <button onClick={() => swiperRef.current?.slideNext()} className={styles.arrowBtn}>→</button>
            </div>
          </div>
          
          <div className={styles.sliderContainer}>
            <Swiper
              modules={[Navigation]}
              onBeforeInit={(swiperInstance) => {
                swiperRef.current = swiperInstance
              }}
              spaceBetween={24}
              slidesPerView={4}          
              slidesPerGroup={1}         
              watchSlidesProgress={true} 
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
  )
}