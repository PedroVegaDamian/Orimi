import { useCartStore } from '@/store/cartStore'
import IconPlus from '@/assets/icons/icon_plus_color.svg'
// import { useState } from 'react'
// import toast from 'react-hot-toast'
// import { Toaster } from 'react-hot-toast'

interface QuantityControlProps {
  id: string | undefined

}

export const Increment = ({ id, }: QuantityControlProps) => {
  //useCartStore
  const { increment, multiply, totalSum } = useCartStore()
  // //useState
  // const [isInStock, setIsInStock] = useState<boolean>(true)
  // //Toast
  // const notify = () => toast.error('Out of stock.')

  const handleIncrement = (id: string | undefined) => {
    increment(id)
    multiply()
    totalSum()
    // const stockStatus = isStock(id)
    // setIsInStock(stockStatus)
    // if (stockStatus) {
    //   notify()
    // }
  }
  

  return (
    <>
    <div className="flex flex-col gap-2">
      <button onClick={() => handleIncrement(id)}>
        <img src={IconPlus} alt="plus" />
      </button>
        {/* <a className="flex flex-col text-red_color text-sm font-medium">
         {isInStock ? 'Add to cart' : 'Out of stock'}
          <Toaster position="top-center" reverseOrder={false} />
        
        </a> */}
        </div>
    </>
  )
}
