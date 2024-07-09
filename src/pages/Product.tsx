import { getProduct } from '@/services/getProduct'
import {useEffect, useState } from 'react'
// import { ChangeEvent, FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Product } from '@/models'
import toast, { Toaster } from 'react-hot-toast'
import { useCartStore } from '@/store/cartStore'
import { Decrement } from '@/components/Decrement'
import { Increment } from '@/components/Increment'
import IconArrowBack from '@/assets/icons/icon_arrow_left_color.svg'

const ProductPage = () => {
  // UseParams
  const { slug } = useParams<{ slug: string }>()

  // UseState
  const [product, setProduct] = useState<Product | undefined>(undefined)
  const [image, setImage] = useState<string | undefined>(undefined)

  // Toast
  const notify = () =>
    toast.success(
      `Successfully added ${cart[index]?.quantity}  ${cart[index]?.name} to the cart.`
    )

  // UseCartStore
  const { cart, increment, multiply, totalSum } = useCartStore()

  // Index (for the quantity of the product in the cart)
  const index = cart.findIndex(product => product.slug === slug)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      const product = await getProduct(slug ?? '')
      setProduct(product)
      setImage(product?.image1)
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
    notify()
    increment(product as Product)
    multiply()
    totalSum()
  }
  // LOGIC FOR INPUT
  // const [inputValue, setInputValue] = useState(Number)
  // const handleInputQuantity = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault() 
  //   increment(product as Product, inputValue) 
  //   notify()
  // }

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setProduct(product)
  //   setInputValue(Number(event.target.value))
  // }

  return (
    <>
      <section className="lg:py-12">
        <div className="container mx-auto px-4">
          <div className="mt-8 grid grid-cols-5 gap-4 lg:gap-0">
            {/* images */}
            <button
              onClick={() => navigate(-1)}
              type="button"
              className=" lg:hidden flex w-1/2 py-2 items-start text-primary_800_color"
            >
              <img
                className=" lg:col-span-3 text-primary_800_color"
                src={IconArrowBack}
              ></img>
              <p className="pl-3">BACK</p>
            </button>
            <div className="col-span-5 lg:col-span-3 flex flex-col items-center">
              <div className=" flex items-center justify-center overflow-hidden rounded-lg w-full lg:w-6/12">
                <img
                  className="w-full h-full object-cover overflow-hidden rounded-lg lg:col-span-4"
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
                  className="aspect-square mb-3 w-1/3 lg:w-32 lg:h-32 overflow-hidden rounded-lg text-center"
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
                  className="aspect-square mb-3 w-1/3 lg:w-32 lg:h-32 overflow-hidden rounded-lg text-center"
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
            {/* name, price, description */}
            <div className="col-span-5 lg:col-start-4 lg:col-end-6">
              {/* design*/}
              <div className="grid grid-cols-2 grid-rows-2 lg:grid lg:grid-rows-4 lg:gap-4">
                <div className="row-span-3 lg:col-span-2 justify-around items-center">
                  <div className="lg:col-span-2  lg:flex lg:items-center lg:justify-start">
                    <h1 className="font-nunito flex text-2xl font-bold justify-center items-center text-primary_800_color ">
                      {product?.name}
                    </h1>
                    <span className="row-span-1 flex pt-3 justify-center items-center lg:justify-start lg:items-start lg:inline-block lg:p-1 lg:pl-4 font-nunito text-lg text-grey_800_color">
                      ${product?.price}
                    </span>
                  </div>
                  <div className="hidden lg:text-pretty lg:mt-4 lg:block lg:row-span-2 lg:p-2 lg:text-left mt-4">
                    {product?.description}
                  </div>
                </div>
                <div className="flex row-span-1 justify-center flex-col lg:col-span-2 lg:col-start-1 lg:col-end-3 lg:flex lg:flex-col lg:items-center lg:justify-center  items-center">
                  <div className="flex items-center">
                    <Decrement id={product?.id} />
                    <p className="text-xl text-center w-16">{cart[index]?.quantity || 0 }</p>

                    {/* INPUT
                    
                    <form onSubmit={handleInputQuantity}>
                      <input
                        className="text-xl bg-bg_color text-center w-16"
                        defaultValue={cart[index]?.quantity || 0 || inputValue}
                        // value={inputValue}
                        onChange={handleChange}
                      />
                    </form> */}

                    {/* 
                      DROPDOWN MENU
                      <select className="px-3 pl-3 bg-bg_color text-2xl justify-center items-center">
                        <option className="justify-center items-center">
                          {cart[index]?.quantity || 0}
                        </option>
                        {[...Array(cart[index]?.stock).keys()].map(n => (
                          <option
                            className="justify-center items-center"
                            key={n + 1}
                            value={n + 1}
                          >
                            {n + 1}
                          </option>
                        ))}
                      </select> */}

                    <Increment product={product} />
                  </div>

                  {cart[index]?.stock <= 0 && (
                    <p className=" text-red_color text-[11px] lg:pt-2">
                      Insufficient stock
                    </p>
                  )}
                </div>

                <div className="lg:col-span-2 flex justify-around items-center">
                  <button
                    className="col-start-2 bg-purple-400 lg:flex lg:items-center lg:justify-center lg:p-4 flex items-center justify-center bg-primary_color rounded-md mt-3 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary_500_color"
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </button>
                  <Toaster position="top-center" reverseOrder={false} />
                </div>
                <div className="col-span-2 bg-pink-200 p-2 lg:row-span-1 lg:col-span-1 text-pretty text-start lg:text-left mt-4 lg:mt-0 mb-[120px] lg:hidden">
                  {product?.description}
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
