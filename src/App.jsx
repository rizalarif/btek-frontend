import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CharacterDetail from './pages/CharacterDetail'
import CharacterList from './pages/CharacterList'
import Home from './pages/Home'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/character",
    element: <CharacterList />
  },
  {
    path: "/characters/:id",
    element: <CharacterDetail />
  },
])

export const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
