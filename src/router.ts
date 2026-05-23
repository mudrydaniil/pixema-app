import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { HomePage } from './pages/HomePage/HomePage'
import { MoviePage } from './pages/MoviePage/MoviePage'

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
        element: `<h2 style={{color: 'white'}}>Trends</h2>`
      },
      {
        path: 'favorites',
        element: `<h2 style={{color: 'white'}}>Favorites</h2>`
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