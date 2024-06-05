import { useEffect, useState } from 'react'
import { getProducts } from '@/services/getProducts'
import { Product } from '@/models'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import PlaceHolder from '@/assets/icons/placeholder-loading.svg'

<<<<<<< feature/cartShopping
export const ProductItem = () => {
=======
const ProductItem = () => {
>>>>>>> develop
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
            <div className="flex flex-col bg-white">
<<<<<<< feature/cartShopping
              <div className="h-60 ">
                <img
                  className="rounded-lg aspect-square"
                  src={product.image1}
                  alt={product.name}
                />
              </div>
=======
          
                <div className="h-60 ">
                  <LazyLoadImage
                    className="rounded-lg aspect-square"
                    effect="blur"
                    alt={product.name}
                    src={product.image1}  
                    placeholderSrc={PlaceHolder} 
                  />
                </div>
          
>>>>>>> develop
              <div className="mt-4 px-5 pb-5">
                <h5 className=" items-center font-nunito text-20 font-bold text-center text-primary_800_color text-2xl">
                  {product.name}
                </h5>

                <div className="mt-2 mb-5 flex items-center justify-center">
                  <p>
                    <span className="font-nunito text-center text-20 font-semibold">
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

export default ProductItem
