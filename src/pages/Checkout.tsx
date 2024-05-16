import { loadStripe } from '@stripe/stripe-js'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js'
import { useCallback } from 'react'
import { useCartStore } from '@/store/cartStore'

const stripePromise = loadStripe(import.meta.env.VITE_API_KEY_PUBLIC_STRIPE)

export const CheckoutPage = () => {
  const cart = useCartStore(state => state.cart)

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch(
      'https://backend-orimi.pedro-angel-vd.workers.dev/create-checkout-session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
      }
    )
      .then(res => res.json())
      .then(data => data.clientSecret)
  }, [])

  return (
    <>
      <div id="checkout">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ fetchClientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </>
  )
}
