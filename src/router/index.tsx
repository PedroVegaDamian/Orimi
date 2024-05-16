import { Navigate, createBrowserRouter } from 'react-router-dom'

import { DefaultLayout } from '@/layouts/DefaulLayout'
import { HomePage } from '@/pages/Home'
import { CartPage } from '@/pages/Cart'
import { AboutPage } from '@/pages/About'
import { LoginPage } from '@/pages/Login'
import { ContactPage } from '@/pages/Contact'
import { ProductPage } from '@/pages/Product'
import { ProductsPage } from '@/pages/Products'
import { FavoritesPage } from '@/pages/Favorites'
import { RegisterPage } from '@/pages/Register'
import { CheckoutPage } from '@/pages/Checkout'

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
      },
      {
        path: 'checkout',
        element: <CheckoutPage />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
])
