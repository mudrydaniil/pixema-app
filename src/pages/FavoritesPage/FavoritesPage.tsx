import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { MovieGrid } from '../../components/MovieGrid/MovieGrid'
import { MovieCard } from '../../components/MovieCard/MovieCard'

export const FavoritesPage = () => {
  const { favorites } = useSelector((state: RootState) => state.favorites)

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      <h2 style={{ 
        color: '#ffffff', 
        fontSize: '28px', 
        fontWeight: 700, 
        marginBottom: '32px',
        marginTop: 0 
      }}>
        Favorites
      </h2>

      {favorites.length === 0 ? (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginTop: '100px',
          textAlign: 'center',
          gap: '16px'
        }}>
          <div style={{ fontSize: '64px' }}>📑</div>
          <div>
            <p style={{ 
              color: '#ffffff', 
              fontSize: '18px', 
              fontWeight: 600, 
              margin: '0 0 8px 0' 
            }}>
              Why is it so empty here?
            </p>
            <p style={{ 
              color: '#7e7e82', 
              fontSize: '14px', 
              fontWeight: 400, 
              margin: 0 
            }}>
              You haven't saved any movies yet. Click the bookmark icon on any movie card to add it here.
            </p>
          </div>
        </div>
      ) : (
        <MovieGrid>
          {favorites.map((movie) => (
            <MovieCard key={movie.kinopoiskId} movie={movie} />
          ))}
        </MovieGrid>
      )}
    </div>
  )
}