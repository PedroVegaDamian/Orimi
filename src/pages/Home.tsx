// import { useStore } from '@/store'

import { ProductItem } from '@/components/ProductsList'

export const HomePage = () => {
  // const bears = useStore(state => state.bears)

  return (
    <div className="bg-bg_color">
      <div className="h-[20vh] w-full">
        <img src="./src/assets/portada.png" alt="header" />
      </div>

      <div className="m-40">
        <h1 className="font-nunito text-22 font-bold text-center text-primary_800_color text-2xl">
          Best Sellers
        </h1>
        <div className="grid grid-cols-4 gap-4">
          <ProductItem />
        </div>
      </div>
    </div>
  )
}
