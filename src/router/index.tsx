import { Navigate, createBrowserRouter } from 'react-router-dom'

import { DefaultLayout } from '@/layouts/DefaulLayout'
import { HomePage } from '@/pages/Home'
import { CartPage } from '@/pages/Cart'
import { AboutPage } from '@/pages/About'
<<<<<<< HEAD
import { DefaultLayout } from '../layouts/DefaulLayout'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import CartPage from '@/pages/Cart'
||||||| 4ca7c18
import { DefaultLayout } from '../layouts/DefaulLayout'
import { Navigate, createBrowserRouter } from 'react-router-dom'
=======
import { LoginPage } from '@/pages/Login'
import { ContactPage } from '@/pages/Contact'
import { ProductPage } from '@/pages/Product'
import { ProductsPage } from '@/pages/Products'
import { FavoritesPage } from '@/pages/Favorites'
import { RegisterPage } from '@/pages/Register'
>>>>>>> 2187c83f57b868c2b4a4b70140684df39223f887

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
        path: 'products',
        element: <ProductsPage />
      },
      {
        path: 'product/:slug',
        element: <ProductPage />
      },
      {
        path: 'about',
        element: <AboutPage />
<<<<<<< HEAD
      },
      {
        path: 'cart-shopping',
        element: <CartPage />
||||||| 4ca7c18
=======
      },
      {
        path: 'contact',
        element: <ContactPage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'favorites',
        element: <FavoritesPage />
      },
      {
        path: 'cart',
        element: <CartPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
>>>>>>> 2187c83f57b868c2b4a4b70140684df39223f887
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
])
