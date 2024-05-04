import { useCartStore } from '@/store/cartStore'
import IconPlus from '@/assets/icons/icon_plus_color.svg'

interface QuantityControlProps {
  id: string | undefined
}

export const Increment = ({ id }: QuantityControlProps) => {
  const { increment, multiply, totalSum } = useCartStore()
  const handleIncrement = (id: string | undefined) => {
    increment(id)
    multiply()
    totalSum()
  }

  return (
    <>
      <button onClick={() => handleIncrement(id)}>
        <img src={IconPlus} alt="plus" />
      </button>
    </>
  )
}
