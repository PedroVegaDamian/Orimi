import { getProduct } from '@/services/getProduct'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '@/models'
import { set } from 'firebase/database'

export const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      const product = await getProduct(slug ?? '')
      setProduct(product)
      console.log(product)
    }
    fetchProducts()
  }, [slug])
  const decrement = () => {
    if (quantity === 0) return
    else {
      setQuantity(quantity - 1)
    }
  }
  const increment = () => {
    setQuantity(quantity + 1)
  }

  return (
    <>
      <div className="bg-bg_color w-full">
        <div className="h-[30vh] w-full overflow-hidden">
          <img
            src={product?.image}
            className="object-cover object-top w-full h-full"
            alt="header"
          />
        </div>

        <div className=" grid grid-cols-4 mt-20">
          <div className="col-span-3 ml-10">
            <div className="grid grid-cols-3 gap-3">
              <img src={product?.image} alt="item detail" />
              <img src={product?.image} alt="item detail" />
              <img src={product?.image} alt="item detail" />
              <h1 className="col-span-3 font-nunito text-22 font-bold text-left text-primary_800_color text-2xl">
                {product?.name}
              </h1>
              <p className="col-span-3 mb-10 text-pretty">
                {product?.description}
              </p>
            </div>
          </div>

          <div className="flex ">
            <div className="items-center gap-4">
              <div className="flex items-center m-5 rounded-md border-1 font-nunito font-medium text-lg leading-8">
                <p className="pr-3">QTY</p>
                <button
                  className="h-10 w-10 rounded-full border-2 border-primary_800_color text-2xl text-primary_800_color"
                  onClick={() => decrement()}
                >
                  -
                </button>
                <p className="px-6 text-2xl">{quantity}</p>
                <button
                  className="h-10 w-10 rounded-full border-2 border-primary_800_color  text-primary_800_color"
                  onClick={() => increment()}
                >
                  +
                </button>
              </div>
              <a
                href="#"
                className="flex items-center justify-center m-6 bg-primary_color rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary_500_color 0"
                // onClick={() => addToCart(product)} // Add to cart function
              >
                Add to cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
