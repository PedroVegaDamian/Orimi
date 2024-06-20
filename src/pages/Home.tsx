import HeaderImage from '@/assets/portada.png'
import { Loading } from '@/components/Loading'
import { Suspense, lazy } from 'react'
import { useFetchProducts } from '@/hooks/useFetchProducts'

const ProductItem = lazy(() => import('@/components/ProductsList'))

const HomePage = () => {
  const { products, loading } = useFetchProducts({ limit: 10 })

  if (loading) {
    return <Loading />
  }

  return (
    <div className="bg-bg_color">
      <div className="relative w-full" style={{ maxHeight: '250px', minHeight: '100px' }}>
        <img
          src={HeaderImage}
          alt="header"
          className="w-full h-full object-cover"
          style={{ maxHeight: '250px', minHeight: '100px' }}
        />
      </div>

      <div className="m-8">
        <h1 className="mt-5 mb-5 font-nunito text-22 font-bold text-center text-primary_800_color text-2xl">
          Best Sellers
        </h1>
        <Suspense fallback={<Loading />}>
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] lg:grid-cols-5 w-full justify-center items-center align-middle">
            <ProductItem products={products} />
          </div>
        </Suspense>
      </div>
    </div>
  )
}

export default HomePage
