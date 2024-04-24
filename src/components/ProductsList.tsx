import { useEffect, useState } from 'react'
import { getProducts } from '@/services/getProducts'
import { Product } from '@/models'

export const ProductItem = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const productsList = await getProducts()
      setProducts(productsList)
    }
    fetchProducts()
  }, [])

  return (
    <>
      {products.map((product, index) => (
        <div key={index}>
          <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg bg-white">
            <a className="relative mx-3 mt-3 flex h-60 " href="/">
              <img src={product.image} alt={product.name} />
            </a>
            <div className="mt-4 px-5 pb-5">
              <h5 className=" items-center tracking-tight font-nunito text-20 font-bold text-center text-primary_800_color text-2xl">
                {product.name}
              </h5>

              <div className="mt-2 mb-5 flex items-center justify-center">
                <p>
                  <span className="font-nunito text-center text-xs font-semibold leading-4">
                    ${product.price}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}