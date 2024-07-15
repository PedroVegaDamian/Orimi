// src/routes/CheckoutGuard.tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNavigationHistory } from '@/utils/useNavigationHistory'

const CheckoutGuard = ({ children }: { children: JSX.Element }) => {
  const history = useNavigationHistory()
  const navigate = useNavigate()

  useEffect(() => {
    const cameFromCart = history[history.length - 2] === '/cart'
    if (!cameFromCart) {
      navigate('/')
    }
  }, [history, navigate])

  return history[history.length - 2] === '/cart' ? children : null
}

export default CheckoutGuard
