import { getProduct } from '@/services/getProduct'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '@/models'
import IconPlus from '@/assets/icons/icon_plus_color.svg'
import IconMinus from '@/assets/icons/icon_minus_color.svg'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import { useCartStore } from '@/store/cartStore'

export const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [image, setImage] = useState(product?.image1)
  const notify = () => toast.success('Succesfully added to the cart.')
  const [isClicked, setIsClicked] = useState(false)

  
  const { cart, increment, decrement } = useCartStore()

  const index = cart.findIndex(product => product.slug === slug)

  useEffect(() => {
    const fetchProducts = async () => {
      const product = await getProduct(slug ?? '')
      setProduct(product)
      setImage(product?.image1)
    }
    fetchProducts()
  }, [slug])
  console.log(cart)
  return (
    <>
      <section className="py-12">
        <div className="container  mx-auto px-4">
          <div className="mt-8 grid grid-cols-5">
            {/* imagenes */}
            <div className="col-span-3">
              <div className="flex items-center justify-center overflow-hiddenrounded-lg">
                <img
                  className="w-6/12 h-6/12 max-w-full object-cover overflow-hidden rounded-lg"
                  src={image}
                  alt="item detail"
                />
              </div>

              <div className="flex flex-row justify-center pt-10 space-x-10">
                <button
                  type="button"
                  className=" aspect-square mb-3 w-32 h-32 overflow-hidden rounded-lg text-center"
                  onClick={() => setImage(product?.image1)}
                >
                  <img
                    className="h-full w-full object-cover"
                    src={product?.image1}
                    alt="item detail"
                  />
                </button>
                <button
                  type="button"
                  className="flex-0 aspect-square mb-3w-32 h-32 overflow-hidden rounded-lg text-center"
                  onClick={() => setImage(product?.image2)}
                >
                  <img
                    className="h-full w-full object-cover"
                    src={product?.image2}
                    alt="item detail"
                  />
                </button>
                <button
                  type="button"
                  className="flex-0 aspect-square mb-3 w-32 h-32 overflow-hidden rounded-lg text-center"
                  onClick={() => setImage(product?.image3)}
                >
                  <img
                    className="h-full w-full object-cover"
                    src={product?.image3}
                    alt="item detail"
                  />
                </button>
              </div>
            </div>
            {/* nombre, precio, description */}
            <div className="col-start-4 col-end-6">
              <div className="flex flex-col justify-center">
                <h1 className="font-nunito pb-10 text-22 font-bold text-left text-primary_800_color text-2xl">
                  {product?.name}
                  <span className="pl-10 font-nunito text-lg text-center text-grey_800_color ">
                    ${product?.price}
                  </span>
                </h1>
                <p className="text-pretty">{product?.description}</p>
              </div>

              <div>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center m-5 rounded-md font-nunito font-medium text-lg leading-8">
                    <p className="pr-3">QTY</p>
                    <button onClick={() => decrement(product?.id)}>
                      <img src={IconMinus} alt="minus" />
                    </button>
                    <p className="px-6 text-2xl">
                      {cart[index]?.quantity || 0}
                    </p>
                    <button onClick={() => increment(product?.id)}>
                      <img src={IconPlus} alt="plus" />
                    </button>
                  </div>
                  <a
                    href="#"
                    className={`flex items-center justify-center bg-primary_color rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary_500_color ${
                      isClicked ? 'cursor-not-allowed bg-primary_500_color' : ''
                    }`}
                    onClick={event => {
                      event.preventDefault()
                      if (!isClicked) {
                        cart.push(product as Product)
                        notify()
                        setIsClicked(true)
                      }
                    }}
                  >
                    Add to cart
                  </a>
                  <Toaster position="top-center" reverseOrder={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
