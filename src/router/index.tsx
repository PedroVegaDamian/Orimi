/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { Loading } from '@/components/Loading'
import { getCurrentUser } from '@/services/user'
import { ProtectedRoute } from './ProtectedRoute'

const HomePage = lazy(() => import('@/pages/Home'))
const CartPage = lazy(() => import('@/pages/Cart'))
const AboutPage = lazy(() => import('@/pages/About'))
const LoginPage = lazy(() => import('@/pages/Login'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const ProductPage = lazy(() => import('@/pages/Product'))
const ContactPage = lazy(() => import('@/pages/Contact'))
const ProfilePage = lazy(() => import('@/pages/Profile'))
const ProductsPage = lazy(() => import('@/pages/Products'))
const RegisterPage = lazy(() => import('@/pages/Register'))
const FavoritesPage = lazy(() => import('@/pages/Favorites'))
const DefaultLayout = lazy(() => import('@/layouts/DefaultLayout'))
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPassword'))
const SendRestePasswordEmailPage = lazy(() => import('@/pages/SendResetPasswordEmail'))
const ConfirmChangePasswordPage = lazy(() => import('@/pages/ConfirmChangePassword'))
import OrdersPage from '@/pages/Orders'
import ContactInfoPage from '@/pages/ContactInfo'
import AddressListPage from '@/pages/AddressList'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <DefaultLayout />
      </Suspense>
    ),
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
        path: 'forgot-password',
        element: (
          <Suspense fallback={<Loading />}>
            <ForgotPasswordPage />
          </Suspense>
        )
      },
      {
        path: 'send-reset-password-email',  
        element: (
          <Suspense fallback={<Loading />}>
            <SendRestePasswordEmailPage />
          </Suspense>
        )
      },
      {path:'confirmChangePassword',
        element:(
          <Suspense fallback={<Loading />}>
            <ConfirmChangePasswordPage />
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
        ),
        children: [
          {
            path: 'myData',
            element: <ContactInfoPage />
          },
          {
            path: 'addresses',
            element: <AddressListPage />
          },
          {
            path: 'orders',
            element: <OrdersPage />
          },
          {
            index: true,
            element: <Navigate to="myData" />
          }
        ]
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
    element: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    )
  }
])
