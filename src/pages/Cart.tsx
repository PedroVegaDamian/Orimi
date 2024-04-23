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
