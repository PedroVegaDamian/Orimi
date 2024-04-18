import { HomePage } from '@/pages/Home'
import { AboutPage } from '@/pages/About'
import {Login} from '@/pages/Login'
import { DefaultLayout } from '../layouts/DefaulLayout'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import { ResetPassword } from '@/pages/ResetPassword'

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
        element: <Login />
      },
      {
        path: 'reset-password',
        element: <ResetPassword />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
])
