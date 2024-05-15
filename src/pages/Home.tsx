import HeaderImage from '@/assets/portada.png'
import { Loading } from '@/components/Loading'
// import { ProductItem } from '@/components/ProductsList'
import { Suspense, lazy } from 'react'

const ProductItem = lazy(() => import('@/components/ProductsList'))
export const HomePage = () => {
  return (
    <div className="bg-bg_color">
      <div className="">
        <img
          src={HeaderImage}
          alt="header"
          className="h-50 w-full overflow-hidden"
        />
      </div>

      <div className="m-20">
        <h1 className="font-nunito text-22 font-bold text-center text-primary_800_color text-2xl">
          Best Sellers
        </h1>
        <Suspense fallback={<Loading/>}>
        <div className="grid grid-cols-4 gap-4">
          <ProductItem />
        </div>
        </Suspense>
      </div>
    </div>
  )
}
