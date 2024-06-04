import HeaderImage from '@/assets/portada.png'
import { Loading } from '@/components/Loading'
import { Suspense, lazy, useEffect, useState } from 'react'
import { db } from '@/firebase/index'
import { collection, getDocs } from 'firebase/firestore'
import { Product as ProductType } from '@/models'

const ProductItem = lazy(() => import('@/components/ProductsList'))

const HomePage = () => {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const productsCollection = collection(db, 'products')
      const productsSnapshot = await getDocs(productsCollection)
      const productsData = productsSnapshot.docs.map(doc => {
        const data = doc.data() as Omit<ProductType, 'id'>
        return { id: doc.id, ...data }
      })
      setProducts(productsData)
      setLoading(false)
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="bg-bg_color">
      <div className="">
        <img
          src={HeaderImage}
          alt="header"
          className="h-28 w-full overflow-hidden"
        />
      </div>

      <div className="m-8">
        <h1 className="mt-5 mb-5 font-nunito text-22 font-bold text-center text-primary_800_color text-2xl">
          Best Sellers
        </h1>
        <Suspense fallback={<Loading />}>
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] w-full">
            <ProductItem products={products} />
          </div>
        </Suspense>
      </div>
    </div>
  )
}

export default HomePage
