import { loadStripe } from '@stripe/stripe-js'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js'
import { useCallback } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'

const stripePromise = loadStripe(import.meta.env.VITE_API_KEY_PUBLIC_STRIPE)

const CheckoutPage = () => {
  const cart = useCartStore(state => state.cart)
  const user = useUserStore(state => state.user)

  const fetchClientSecret = useCallback(async () => {
    try {
      const res = await fetch(
        'https://orimi-checkout.orimi.workers.dev/create-checkout-session',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ cart, user: { email: user?.email } })
        }
      )
      const data = await res.json()
      return data.clientSecret
    } catch (error) {
      console.error('Error fetching client secret:', error)
      return
    }
  }, [])

  const options = { fetchClientSecret }

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default CheckoutPage
