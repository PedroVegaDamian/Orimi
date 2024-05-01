import { useEffect, useState } from 'react'
import { getProducts } from '@/services/getProducts'
import { Product } from '@/models'
import { Link } from 'react-router-dom'


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
      {products.map(product => (
        <div key={product.slug}>
          <Link to={`/product/${product.slug}`}>
            <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg bg-white">
              <div className="relative mx-3 mt-3 flex h-60 ">
                <img src={product.image1} alt={product.name} />
              </div>
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
          </Link>
        </div>
      ))}
    </>
  )
}
