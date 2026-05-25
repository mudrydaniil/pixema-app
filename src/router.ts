import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { HomePage } from './pages/HomePage/HomePage'
import { MoviePage } from './pages/MoviePage/MoviePage'
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage'
import { TrendsPage } from './pages/TrendsPage/TrendsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomePage
      },
      {
        path: 'movie/:id',
        Component: MoviePage
      },
      {
        path: 'trends',
        Component: TrendsPage
      },
      {
        path: 'favorites',
        Component: FavoritesPage
      },
      {
        path: 'settings',
        element: 'Настройки'
      },
      {
        path: '*',
        element: 'Страница не найдена'
      }
    ]
  }
], {
  basename: '/pixema-app/'
})