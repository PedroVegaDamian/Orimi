import { HomePage } from '@/pages/Home'
import { AboutPage } from '@/pages/About'
import { LoginPage } from '@/pages/LoginPage'
import { DefaultLayout } from '../layouts/DefaulLayout'
import { Navigate, createBrowserRouter } from 'react-router-dom'

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
        path: 'login',
        element: <LoginPage />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
])
