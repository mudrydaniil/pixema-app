import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

export function App(): React.ReactElement {
  return (
    <RouterProvider router={router} />
  )
}