import { getProduct } from '@/services/getProduct'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Product } from '@/models'
import toast, { Toaster } from 'react-hot-toast'
import { useCartStore } from '@/store/cartStore'
import { Decrement } from '@/components/Decrement'
import { Increment } from '@/components/Increment'
import IconArrowBack from '@/assets/icons/icon_arrow_left_black.svg'

const ProductPage = () => {
  // UseParams
  const { slug } = useParams<{ slug: string }>()
  // UseState
  const [product, setProduct] = useState<Product | null>(null)
  const [image, setImage] = useState<string | undefined>(undefined)
  const [isClicked, setIsClicked] = useState(false)
  // Toast
  const notify = () => toast.success('Successfully added to the cart.')
  const { cart, increment, multiply, totalSum } = useCartStore()
  // Index (for the quantity of the product in the cart)
  const index = cart.findIndex(product => product.slug === slug)
  // Check if the product is in the cart
  const [isInCart, setIsInCart] = useState(false)
  const [productInCart, setProductInCart] = useState<Product | undefined>()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchProducts = async () => {
      const product = await getProduct(slug ?? '')
      setProduct(product)
      setImage(product?.image1)

      const productInCart = cart.find(items => items.id === product?.id)
      setProductInCart(productInCart)
      setIsInCart(productInCart ? true : false)
    }
    fetchProducts()
  }, [slug, cart])

  const handleImageClick = (imageUrl: string | undefined) => {
    setImage(imageUrl)
  }

  const handleAddToCart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    if (productInCart) {
      increment(product?.id)
    } else if (!isClicked) {
      cart.push(product as Product)
      notify()
      increment(product?.id)
      setIsClicked(true)
      setIsInCart(true)
      multiply()
      totalSum()
    }
  }

  return (
    <>
      <section className="lg:py-12">
        <div className="container mx-auto px-4">
          <div className="mt-8 grid grid-cols-5 gap-4 lg:gap-0">
            {/* imágenes */}
            <div className="col-span-5 flex flex-col items-start">
              <button
              onClick={() => navigate(-1)}
                type="button"
                className=" lg:hidden flex items-start justify-start w-1/2 py-2 text-primary_800_color"
              >
                <img className=" text-primary_800_color" src={IconArrowBack}></img>
              </button>
              <div className="flex items-center justify-center overflow-hidden rounded-lg w-full lg:w-6/12">
                <img
                  className="w-full h-full object-cover overflow-hidden rounded-lg"
                  src={image}
                  alt="item detail"
                />
              </div>
              <div className="flex flex-row justify-center pt-2 lg:pt-10 space-x-2 lg:space-x-4 w-full lg:w-auto mt-4 lg:mt-0">
                <button
                  type="button"
                  className="aspect-square mb-3 w-1/3 lg:w-32 lg:h-32 overflow-hidden rounded-lg text-center"
                  onClick={() => handleImageClick(product?.image1)}
                >
                  <img
                    className="h-full w-full object-cover"
                    src={product?.image1}
                    alt="item detail"
                  />
                </button>
                <button
                  type="button"
                  className="aspect-square mb-3 w-1/3 lg:w-32 h-32 overflow-hidden rounded-lg text-center"
                  onClick={() => handleImageClick(product?.image2)}
                >
                  <img
                    className="h-full w-full object-cover"
                    src={product?.image2}
                    alt="item detail"
                  />
                </button>
                <button
                  type="button"
                  className="aspect-square mb-3 w-1/3 lg:w-32 h-32 overflow-hidden rounded-lg text-center"
                  onClick={() => handleImageClick(product?.image3)}
                >
                  <img
                    className="h-full w-full object-cover"
                    src={product?.image3}
                    alt="item detail"
                  />
                </button>
              </div>
            </div>
            {/* nombre, precio, descripción */}
            <div className="col-span-5 lg:col-start-4 lg:col-end-6">
              {/* Diseño para dispositivos pequeños */}
              <div className="block lg:hidden sm:grid sm:grid-cols-2 sm:gap-4">
                <div className="sm:col-span-1 flex justify-around items-center">
                  <h1 className="font-nunito text-2xl font-bold text-primary_800_color">
                    {product?.name}
                  </h1>
                  <div className="flex items-center">
                    {isInCart && (
                      <div className="flex items-center mt-3">
                        <Decrement id={product?.id} />
                        <p className="px-6 text-2xl">
                          {cart[index]?.quantity || 0}
                        </p>
                        <Increment id={product?.id} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-1 flex justify-around items-center">
                  <span className="font-nunito text-lg text-grey_800_color">
                    ${product?.price}
                  </span>
                  <button
                    className={`flex items-center justify-center bg-primary_color rounded-md mt-3 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary_500_color ${
                      isClicked || isInCart
                        ? 'cursor-not-allowed bg-primary_500_color'
                        : ''
                    }`}
                    disabled={isClicked || isInCart}
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              <p className="text-pretty text-start lg:text-left mt-4 lg:mt-0 mb-[120px] lg:hidden">
                {product?.description}
              </p>
              {/* Diseño para dispositivos grandes */}
              <div className="hidden lg:flex flex-col items-center lg:items-start">
                <h1 className="font-nunito pb-10 text-22 font-bold text-left text-primary_800_color text-2xl">
                  {product?.name}
                  <span className="pl-10 font-nunito text-lg text-center text-grey_800_color ">
                    ${product?.price}
                  </span>
                </h1>
                <p className="text-pretty text-center lg:text-left mt-4">
                  {product?.description}
                </p>
                <div className="flex w-full flex-col items-center gap-4">
                  {isInCart && (
                    <div className="flex items-center mt-3">
                      <Decrement id={product?.id} />
                      <p className="px-6 text-2xl">
                        {cart[index]?.quantity || 0}
                      </p>
                      <Increment id={product?.id} />
                    </div>
                  )}
                  <button
                    className={`flex items-center justify-center bg-primary_color rounded-md mt-3 px-5 py-2.5 mb-[70px] text-center text-sm font-medium text-white hover:bg-primary_500_color ${
                      isClicked || isInCart
                        ? 'cursor-not-allowed bg-primary_500_color'
                        : ''
                    }`}
                    disabled={isClicked || isInCart}
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </button>
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

export default ProductPage
