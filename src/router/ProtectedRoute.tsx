import { useCartStore } from '@/store/cartStore'
import { Navigate, useLoaderData, useLocation } from 'react-router-dom'

interface Props {
  redirectPath?: string
  children: JSX.Element
}

export const ProtectedRoute = ({ children }: Props) => {
  const user = useLoaderData()

  if (user === null) return <Navigate replace to="/" />

  return children
}

export const CheckoutProtectedRoute = ({ children}: Props) => {
  const location = useLocation()
  const cartStore = useCartStore()

  if (location?.state?.from !== '/cart' || cartStore.cart.length === 0)
    return <Navigate replace to="/" />

  return children

}
