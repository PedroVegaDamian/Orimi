import { useNavigate } from 'react-router-dom'
import SadShoppingBag from '@/assets/icons/icon_sad_bag.svg'

export const EmptyCart = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-bg_color grid grid-cols-1 lg:grid-cols-2 lg:h-dvh">
      <div className="flex flex-col justify-center items-center mt-[50px] lg:justify-start lg:items-end lg:pt-10 lg:mt-44 lg:mr-10">
        <img src={SadShoppingBag} className="h-40 lg:h-56"></img>
      </div>
      <div className="flex flex-col justify-center items-center mt-[50px] lg:items-start lg:pl-10 lg:justify-start lg:pt-40 lg:h-full">
        <h1 className="lg:mt-28 text-3xl lg:text-[48px] font-medium text-center lg:text-left text-primary_800_color">
          Nothing in here!
        </h1>
        <p className="flex text-lg lg:text-xl mb-2 lg:mt-6 text-center lg:text-left">
          Your cart is currently empty.
        </p>

        <div className="lg:gap-3 lg:mt-8 mb-[150px] lg:mb-0">
          <button
            onClick={() => navigate('/')}
            className="w-50 bg-primary_color font-nunito text-base font-semibold leading-22 text-center bg-purple-400 hover:bg-primary-700 focus:bg-primary_500_color rounded-lg px-5 py-2.5 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmptyCart
