import { CartState,} from '@/models'
import { create } from 'zustand'

export const useCartStore = create<CartState>(set => ({
  total: 0,
  cart: [],
  increment: (id: string|undefined) =>
    set((state) => ({
      cart: state.cart.map((product) =>
        product.id === id ? { ...product, quantity: product.quantity + 1 || 1 } : product
      ),
    })),
  decrement: (id: string|undefined) =>
    set((state) => ({
      cart: state.cart.map((product) =>
        product.id === id && product.quantity > 0 ? { ...product, quantity: product.quantity - 1 || 1} : product
      ),
    })),
  removeProduct: (slug: string|undefined) =>
    set(state => ({
      cart: state.cart.filter(product => product.slug !== slug)
    }))
    // multiply:(price: number, quantity: number) => {
    //   set((state) => ({
    //     cart: state.cart.map((product) =>
    //       product.price * product.quantity
    //     ),
    //   }))
}))
