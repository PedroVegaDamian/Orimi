import { useCartStore } from '@/store/cartStore'
import IconMinus from '@/assets/icons/icon_minus_color.svg'

interface QuantityControlProps {
  id: string | undefined
}

export const Decrement = ({ id }: QuantityControlProps) => {
  const { decrement, multiply, totalSum } = useCartStore()

  const handleDecrement = (id: string | undefined) => {
    decrement(id)
    multiply()
    totalSum()
  }
  return (
    <>
      <button onClick={() => handleDecrement(id)}>
        <img src={IconMinus} alt="minus" className='w-[15px] lg:w-[20px]' />
      </button>
    </>
  )
}
