import { useNavigate } from 'react-router-dom'
import SadShoppingBag from '@/assets/icons/icon_sad_bag.svg'

export const EmptyCart = () => {
  const navigate = useNavigate()

  return (
    <div className="">
      <div className="grid grid-col">
        <h1 className="mt-28 text-[48px] font-medium text-center text-primary_800_color">
          Your cart is empty
        </h1>
        <div className="flex flex-row justify-start h-screen items-start">
          <div className="flex pt-10 pr-44 items-start justify-end w-1/2">
            <img src={SadShoppingBag} className=""></img>
          </div>
          <div className="flex flex-col items-start pl-44 justify-start pt-40 w-1/2 h-full">
            <p className="flex flex-row text-xl"> Add items to get started</p>

            <div className="gap-3 mt-8">
              <button
                onClick={() => navigate('/')}
                className="w-50 bg-primary_color font-nunito text-lg font-semibold leading-22 text-center bg-purple-400 hover:bg-primary-700 focus:bg-primary_500_color  rounded-lg px-5 py-2.5  shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
