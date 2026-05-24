import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Movie } from '../../types/movie'

interface FavoritesState {
  favorites: Movie[]
}

const loadFavoritesFromStorage = (): Movie[] => {
  try {
    const saved = localStorage.getItem('pixema_favorites')
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('Failed to load favorites from localStorage', error)
    return []
  }
}

const initialState: FavoritesState = {
  favorites: loadFavoritesFromStorage()
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Movie>) => {
      const movieId = action.payload.kinopoiskId
      
      const movieIndex = state.favorites.findIndex(
        (m) => m.kinopoiskId === movieId
      )

      if (movieIndex >= 0) {
        state.favorites.splice(movieIndex, 1)
      } else {
        state.favorites.push(action.payload)
      }

      localStorage.setItem('pixema_favorites', JSON.stringify(state.favorites))
    },
    clearFavorites: (state) => {
      state.favorites = []
      localStorage.removeItem('pixema_favorites')
    }
  }
})

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer