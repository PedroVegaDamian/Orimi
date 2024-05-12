import HeaderImage from '@/assets/portada.png'
import { ProductItem } from '@/components/ProductsList'

export const HomePage = () => {
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
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] w-full">
          <ProductItem />
        </div>
      </div>
    </div>
  )
}
