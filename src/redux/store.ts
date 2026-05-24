import { configureStore } from '@reduxjs/toolkit'
import catalogReducer from './slices/catalog-slice'
import movieReducer from './slices/movie-slice'
import favoritesReducer from './slices/favorites-slice'

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    movie: movieReducer,
    favorites: favoritesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch