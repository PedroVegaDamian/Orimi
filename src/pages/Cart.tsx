<<<<<<< HEAD
import { useCartStore } from "@/store/cartStore"
import { useEffect } from "react";

const CartPage = () => {

  const products = useCartStore(state => state.products);

  useEffect(() => {
    console.log(products);
    
  }, []);
  return (
    <div>
      cart page
    </div>
  )
}

export default CartPage
||||||| 4ca7c18
=======
export const CartPage = () => {
  return <div>CartPage</div>
}
>>>>>>> 2187c83f57b868c2b4a4b70140684df39223f887
