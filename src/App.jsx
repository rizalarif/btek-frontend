import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import RequireAuth from './components/RequireAuth'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import { store } from './redux/store'


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
    element: <RequireAuth> <Profile /> </RequireAuth>,
  },
  {
    path: "/profile/edit",
    element:<RequireAuth><EditProfile /></RequireAuth>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
])

export const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
