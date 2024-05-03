import { useCartStore } from '@/store/cartStore'
import { useEffect} from 'react'
import IconPlus from '@/assets/icons/icon_plus_color.svg'
import IconMinus from '@/assets/icons/icon_minus_color.svg'
import IconBin from '@/assets/icons/icon_rubbish_bin.png'
import { Link } from 'react-router-dom'

export const CartPage = () => {
  const { cart, increment, decrement, removeProduct } = useCartStore()

 console.log(cart)
  useEffect(() => {
    
  }, [])
  return (
   
      <section className="bg-white_color py-24">
        <div className="max-w-7xl px-5 lg-6 mx-auto">
          <h2 className="font-nunito text-3xl font-bold text-center text-primary_800_color">
            Shopping Cart
          </h2>
          {/* {*SUBTITULOS*} */}
          <div className="grid py-6">
            <p className="font-nunito text-xl text-gray-500 flex justify-end">
              <span className="w-full max-w-[260px] text-center">Quantity</span>
              <span className="w-full max-w-[200px] text-center">Total</span>
            </p>
          </div>

          {cart.map(product => (
       

          <>
              <div key={product.slug} className="grid grid-cols-2 border-t border-gray-200 py-6">
                <div className="flex items-center flex-row gap-6 w-full mx-auto">
                    <Link className="flex items-center flex-row gap-6 w-full mx-auto" to={`/product/${product.slug}`}>
                  <div className="">
                    <img
                      src={product.image1}
                      alt="product img"
                      className="xl:w-[140px]" />
                  </div>
                  <div className="pro-data w-full max-w-sm">
                    <h5 className="font-nunito text-22 font-bold text-primary_tono5_color text-2xl">
                      {product.name}
                    </h5>
                    <h6 className="font-medium text-lg leading-8 text-indigo-600  max-[550px]:text-center">
                      ${product.price}
                    </h6>
                  </div>
                      </Link>
                </div>
                <div className="flex items-center justify-end flex-row w-full max-w-xl mx-auto gap-2">
                  <div className="flex pr-20">
                    <button onClick={() => decrement(product.id)}>
                      <img src={IconMinus} alt="minus" />
                    </button>
                    <p className="px-6 text-2xl">{product.quantity}</p>
                    <button onClick={() => increment(product.id)}>
                      <img src={IconPlus} alt="plus" />
                    </button>
                  </div>
                  <h6 className=" pl-10 font-nunito text-xl font-bold text-left text-grey_800_color">
                    $120.00
                  </h6>
                  <button onClick={() => removeProduct(product.slug)}>
                    <img className="pl-5" src={IconBin} alt="rubbish bin" />
                  </button>
                </div>
              </div>
              </>
      ))}
              <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto bg-bg_color">
                <div className="flex items-center justify-end w-full py-6border-b border-grey_900_color ">
                  <p className="font-nunito pr-5 text-3xl font-medium text-gray-900">
                    Total
                  </p>
                  <h6 className="font-nunito font-medium text-3xl leading-9 text-indigo-500">
                    $405.00
                  </h6>
                </div>
              </div>
              <div className="flex items-end flex-col justify-center gap-3 mt-8">
                <button className="w-50 bg-primary_color font-nunito text-lg font-semibold leading-22 text-center bg-purple-400 hover:bg-primary-700 focus:bg-primary_500_color  rounded-lg px-5 py-2.5  shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                  Continue to Payment
                </button>
              </div>
        </div>
      </section>
    
  )
}
