import { Navigate, createBrowserRouter } from 'react-router-dom'

import { DefaultLayout } from '@/layouts/DefaulLayout'
import { HomePage } from '@/pages/Home'
import { CartPage } from '@/pages/Cart'
import { AboutPage } from '@/pages/About'
import { LoginPage } from '@/pages/Login'
import { ContactPage } from '@/pages/Contact'
import { ProductPage } from '@/pages/Product'
import { ProfilePage } from '@/pages/Profile'
import { ProductsPage } from '@/pages/Products'
import { FavoritesPage } from '@/pages/Favorites'
import { RegisterPage } from '@/pages/Register'
import { ProtectedRoute } from './ProtectedRoute'
import { getCurrentUser } from '@/services/user'

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
        path: 'profile',
        loader: async () => await getCurrentUser(),
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        )
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
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
])
