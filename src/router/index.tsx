/* eslint-disable react-refresh/only-export-components */
import { Navigate, createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import { Loading } from '@/components/Loading'

const DefaultLayout = lazy(() => import('@/layouts/DefaulLayout'))
const ProductPage = lazy(() => import('@/pages/Product'))
const HomePage = lazy(() => import('@/pages/Home'))
const CartPage = lazy(() => import('@/pages/Cart'))
const AboutPage = lazy(() => import('@/pages/About'))
const LoginPage = lazy(() => import('@/pages/Login'))
const ContactPage = lazy(() => import('@/pages/Contact'))
const ProfilePage = lazy(() => import('@/pages/Profile'))
const ProductsPage = lazy(() => import('@/pages/Products'))
const FavoritesPage = lazy(() => import('@/pages/Favorites'))
const RegisterPage = lazy(() => import('@/pages/Register'))
const CheckoutPage = lazy(() => import('@/pages/Checkout'))
import { ProtectedRoute } from './ProtectedRoute'
import { getCurrentUser } from '@/services/user'

export const router = createBrowserRouter([
  {
    path: '',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<Loading />}>
            <HomePage />
          </Suspense>
        )
      },
      {
        path: 'products',
        element: (
          <Suspense fallback={<Loading />}>
            <ProductsPage />
          </Suspense>
        )
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
        element: (
          <Suspense fallback={<Loading />}>
            <AboutPage />
          </Suspense>
        )
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<Loading />}>
            <ContactPage />
          </Suspense>
        )
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<Loading />}>
            <LoginPage />
          </Suspense>
        )
      },
      {
        path: 'profile',
        loader: async () => await getCurrentUser(),
        element: (
          <ProtectedRoute>
               <Suspense fallback={<Loading />}>
            <ProfilePage />
          </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'favorites',
        element: (
          <Suspense fallback={<Loading />}>
            <FavoritesPage />
          </Suspense>
        )
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={<Loading />}>
            <CartPage />
          </Suspense>
        )
      },
      {
        path: 'checkout',
        loader: async () => await getCurrentUser(),
        element: (
          <ProtectedRoute>
               <Suspense fallback={<Loading />}>
            <CheckoutPage />
          </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<Loading />}>
            <RegisterPage />
          </Suspense>
        )
      }
      
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
])
