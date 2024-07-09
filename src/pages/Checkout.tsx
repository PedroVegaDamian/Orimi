import { loadStripe } from '@stripe/stripe-js'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js'
import { useCallback } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import toast, { Toaster } from 'react-hot-toast'
import IconCopy from '@/assets/icons/icon_copy.svg'
import { Accordion } from '@/components/ui/Accordion'

const stripePromise = loadStripe(import.meta.env.VITE_API_KEY_PUBLIC_STRIPE)

const CheckoutPage = () => {
  const cart = useCartStore(state => state.cart)
  const user = useUserStore(state => state.user)

  const fetchClientSecret = useCallback(async () => {
    try {
      const res = await fetch(
        'https://orimi-checkout-prod.orimi.workers.dev/create-checkout-session',
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
    <div id="checkout" className="bg-white_color pb-[150px]">
      <Toaster />
      <InformationCard />
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

const InformationCard = () => {
  const handleClickCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!', {
      duration: 1000,
      position: 'bottom-center'
    })
  }

  return (
    <div className="px-2 min-[425px]:px-0 max-w-[412px] min-[992px]:max-w-[888px] mx-auto text-grey_800_color">
      <Accordion
        title="Test Information Card (Click to Open)"
        content={
          <div>
            <p
              title="Click to copy"
              className="cursor-pointer "
              onClick={() => handleClickCopy('4242 4242 4242 4242')}
            >
              <img
                width={14}
                src={IconCopy}
                alt="Icon Copy"
                className="inline-block mr-1"
              />
              Card Number: 4242 4242 4242 4242
            </p>
            <p
              title="Click to copy"
              className="cursor-pointer"
              onClick={() => handleClickCopy('12/74')}
            >
              <img
                width={14}
                src={IconCopy}
                alt="Icon Copy"
                className="inline-block mr-1"
              />
              Card Expiry: 12/74
            </p>
            <p
              title="Click to copy"
              className="cursor-pointer"
              onClick={() => handleClickCopy('123')}
            >
              <img
                width={14}
                src={IconCopy}
                alt="Icon Copy"
                className="inline-block mr-1"
              />
              CVC: 123
            </p>
          </div>
        }
      />
    </div>
  )
}

export default CheckoutPage
