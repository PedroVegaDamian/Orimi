import { Navigate, createBrowserRouter } from 'react-router-dom'

import { DefaultLayout } from '@/layouts/DefaulLayout'
import { HomePage } from '@/pages/Home'
import { CartPage } from '@/pages/Cart'
import { AboutPage } from '@/pages/About'
import { LoginPage } from '@/pages/Login'
import { ContactPage } from '@/pages/Contact'
import { ProductsPage } from '@/pages/Products'
import { FavoritesPage } from '@/pages/Favorites'
import { ProfilePage } from '@/pages/Profile'

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
        path: 'profile',
        element: <ProfilePage />
      },
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
])
