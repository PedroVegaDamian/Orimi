import { HomePage } from '@/pages/Home'
import { AboutPage } from '@/pages/About'
import { DefaultLayout } from '../layouts/DefaulLayout'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import CartPage from '@/pages/Cart'

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
        path: 'cart-shopping',
        element: <CartPage />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
])
