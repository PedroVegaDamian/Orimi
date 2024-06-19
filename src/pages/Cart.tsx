import { useCartStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import IconBin from '@/assets/icons/icon_rubbish_bin.png'
import { Link } from 'react-router-dom'
import { EmptyCart } from '@/components/EmptyCart'
import { Increment } from '@/components/Increment'
import { Decrement } from '@/components/Decrement'
import { useNavigate } from 'react-router-dom'
import { Title } from '@/components/ui/Title'

const CartPage = () => {
  const { total, cart, removeProduct, multiply, totalSum } = useCartStore()
  const { user } = useUserStore()
  const navigate = useNavigate()

  const handleRemove = (slug: string | undefined) => {
    removeProduct(slug)
    multiply()
    totalSum()
  }

  const handleClick = () => {
    if (user) {
      navigate('/checkout')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className='bg-bg_color'>
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <section className="bg-bg_color pb-24">
          <div className="max-w-7xl px-5 lg-6 mx-auto">
            <Title>Shopping Cart</Title>
            {/* Table Headers */}
            <div className="grid py-6 text-center lg:text-left">
              <div className="grid grid-cols-3">
                <p></p>
                <p className="font-nunito lg:text-xl text-gray-500 text-center">Quantity</p>
                <p className="font-nunito lg:text-xl text-gray-500 text-center">Total</p>
              </div>
            </div>
            {/* Table Content */}
            {cart.map(product => (
              <div
                key={product.id}
                className="grid grid-cols-3 0 py-6 border-t border-primary_800_color mb-6"
              >
                {/* Image */}
                <div className="flex justify-center lg:justify-start">
                  <Link to={`/product/${product.slug}`}>
                    <img
                      src={product.image1}
                      alt="product img"
                      className="w-[100px] xl:w-[140px]"
                    />
                  </Link>
                </div>
                {/* Quantity */}
                <div className="flex justify-center items-center h-[80px] flex-col">
                  <div className="flex items-center">
                    <Decrement id={product?.id} />
                    <p className="px-[10px] lg:px-6 lg:text-2xl">{product.quantity}</p>
                    <Increment id={product?.id} />
                  </div>
                  {product.stock <= 0 && (
                    <p className="text-red_color text-[11px]">Out of stock</p>
                  )}
                </div>
                {/* Total */}
                <div className="flex justify-center items-center h-[80px]">
                  <h6 className="lg:text-2xl text-grey_800_color">
                    {`$ ${product.subtotal ?? product.price}`}
                  </h6>
                  <button
                    className="pt-1"
                    onClick={() => handleRemove(product.slug)}
                  >
                    <img className="pl-5" src={IconBin} alt="rubbish bin" />
                  </button>
                </div>
              </div>
            ))}
            {/* Total Amount */}
            <div className="rounded-lg pr-6 lg:rounded-xl lg:p-6 w-full mb-8 bg-white_color border-1 border-primary_color">
              <div className="flex items-center justify-end w-full py-6">
                <p className="font-nunito pr-5 font-bold lg:text-3xl lg:font-medium">Total</p>
                <h6 className="font-nunito font-bold lg:font-medium lg:text-3xl leading-9">
                  {`$  ${total}`}
                </h6>
              </div>
            </div>
            {/* Continue to Payment Button */}
            <div className="flex items-end flex-col justify-center gap-3 mt-8">
              <button
                className="mb-[80px] w-50 bg-primary_color font-nunito text-lg font-semibold leading-22 text-center bg-purple-400 hover:bg-primary-700 focus:bg-primary_500_color rounded-lg px-5 py-2.5 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                onClick={handleClick}
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default CartPage
