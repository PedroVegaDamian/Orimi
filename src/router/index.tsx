import { Navigate, createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import { DefaultLayout } from '@/layouts/DefaulLayout'
import { HomePage } from '@/pages/Home'
import { CartPage } from '@/pages/Cart'
import { AboutPage } from '@/pages/About'
import { LoginPage } from '@/pages/Login'
import { ContactPage } from '@/pages/Contact'
// import { ProductPage } from '@/pages/Product'
import { ProductPage } from '@/pages/Product'
import { ProfilePage } from '@/pages/Profile'
import { ProductsPage } from '@/pages/Products'
import { FavoritesPage } from '@/pages/Favorites'
import { RegisterPage } from '@/pages/Register'
import { Loading } from '@/components/Loading'

const ProductPage = lazy(() => import('@/pages/Product'))

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
        element: (
          <Suspense fallback={<Loading />}>
            <ProductPage />
          </Suspense>
        )
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
        element: <ProfilePage />
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
        path: 'loading',
        element: <Loading />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
])
