import { useCartStore } from '@/store/cartStore'
import IconPlus from '@/assets/icons/icon_plus_color.svg'
import { Product } from '@/models'
interface QuantityControlProps {
  product: Product | undefined
}

export const Increment = ({ product }: QuantityControlProps) => {
  const { increment, multiply, totalSum } = useCartStore()

  const handleIncrement = (product: Product | undefined) => {
    increment(product as Product)
    multiply()
    totalSum()
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <button onClick={() => handleIncrement(product)}>
          <img src={IconPlus} alt="plus" className='w-[15px] lg:w-[20px]'/>
        </button>
      </div>
    </>
  )
}
