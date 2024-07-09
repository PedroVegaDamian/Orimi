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
const ProductsPage = lazy(() => import('@/pages/Products'))
const RegisterPage = lazy(() => import('@/pages/Register'))
const FavoritesPage = lazy(() => import('@/pages/Favorites'))
const DefaultLayout = lazy(() => import('@/layouts/DefaultLayout'))

const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPassword'))
const SendRestePasswordEmailPage = lazy(
  () => import('@/pages/SendResetPasswordEmail')
)
const ConfirmChangePasswordPage = lazy(
  () => import('@/pages/ConfirmChangePassword')
)

const PaymentSuccesfull = lazy(() => import('@/pages/PaymentSuccesfull'))
const CheckoutPage = lazy(() => import('@/pages/Checkout'))

const ProfilePage = lazy(() => import('@/pages/Profile'))
const UserInfoPage = lazy(() => import('@/pages/UserInfo'))
const AddressListPage = lazy(() => import('@/pages/AddressList'))
const OrdersPage = lazy(() => import('@/pages/Orders'))
const OrderDetailPage = lazy(() => import('@/pages/OrderDetail'))

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
      {
        path: 'confirmChangePassword',
        element: (
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
            element: <UserInfoPage />
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
            path: 'orders/:orderId',
            element: <OrderDetailPage />
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
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <CheckoutPage />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: 'paymentsuccessfull',
        element: (
          <Suspense fallback={<Loading />}>
            <PaymentSuccesfull />
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
