import { useNavigate } from 'react-router-dom'
import IconCheck from '@/assets/icons/icon_check.svg'
import { useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import addOrder from '@/services/addOrder'

const PaymentSuccesfullPage = () => {
  const { cart, resetCart } = useCartStore()
  const navigate = useNavigate()

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const sessionId = urlParams.get('session_id')

    fetch(
      `https://orimi-checkout.orimi.workers.dev/session-status?session_id=${sessionId}`
    )
      .then(res => res.json())
      .then(data => addOrder(data.session, cart))
      .then(() => resetCart())
  }, [])

  return (
    <>
      <div className=" flex justify-center items-center w-full mt-10">
        <div className="p-4 w-full max-w-md h-full">
          <div className="p-4 text-center  bg-white_color rounded-lg shadow ">
            <div className="w-12 h-12 rounded-full bg-green_color p-2 flex items-center justify-center mx-auto mb-3.5">
              <img src={IconCheck} className="h-56"></img>
            </div>
            <h1 className="text-2xl font-medium text-center text-primary_800_color">
              Payment Done!
            </h1>
            <p className="text-lg">
              Thank you for completing your secure online payment.
            </p>
            <div className="gap-3 mt-8">
              <button
                onClick={() => navigate('/')}
                className="w-30 bg-primary_color font-nunito text-base font-semibold leading-22 text-center bg-purple-400 hover:bg-primary-700 focus:bg-primary_500_color  rounded-lg px-5 py-2.5  shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentSuccesfullPage
