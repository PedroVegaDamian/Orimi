import { HomePage } from '@/pages/Home'
import { AboutPage } from '@/pages/About'
import { DefaultLayout } from '../layouts/DefaulLayout'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import { RegisterPage } from '@/pages/Register'

export const router = createBrowserRouter([
  {
    path: '',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <HomePage />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
])
