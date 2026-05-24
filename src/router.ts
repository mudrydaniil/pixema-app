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
        element: `<h2 style={{color: 'white'}}>Settings</h2>`
      },
      {
        path: '*',
        element: `<h2 style={{color: 'white'}}>Not Found</h2>`
      }
    ]
  }
], {
  basename: '/pixema-app/'
})