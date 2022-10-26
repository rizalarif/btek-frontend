import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import RequireAuth from './components/RequireAuth'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth><Home /></RequireAuth>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <RequireAuth> <Profile/> </RequireAuth>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
])

export const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
