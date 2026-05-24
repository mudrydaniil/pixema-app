import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { 
  fetchMovieById, 
  fetchMovieStaff, 
  fetchSimilarMovies, 
  fetchMovieBoxOffice, 
  clearMovie 
} from '../../redux/slices/movie-slice'
import { MovieDetails } from '../../components/MovieDetails/MovieDetails'

export const MoviePage = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()

  const { 
    movie, staff, similarMovies, boxOffice, 
    isDetailsLoading, isStaffLoading, isBoxOfficeLoading 
  } = useSelector((state: RootState) => state.movie)

  useEffect(() => {
    window.scrollTo(0, 0)

    if (id && id !== 'undefined') {
      dispatch(fetchMovieById(id))
      dispatch(fetchMovieStaff(id))
      dispatch(fetchSimilarMovies(id))
      dispatch(fetchMovieBoxOffice(id))
    }

    return () => {
      dispatch(clearMovie())
    }
  }, [id, dispatch])

  if (isDetailsLoading || isStaffLoading || isBoxOfficeLoading) {
    return <div style={{ color: 'white', padding: '40px' }}>Loading...</div>
  }

  return (
    <section style={{ padding: '40px', backgroundColor: '#000000' }}>
      {movie && (
        <MovieDetails 
          movie={movie} 
          staff={staff || []} 
          similarMovies={similarMovies || []} 
          boxOffice={boxOffice || []} 
        />
      )}
    </section>
  )
}