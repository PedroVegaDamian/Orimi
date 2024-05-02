import { CartState, Product } from '@/models'
import { create } from 'zustand'

export const useCartStore = create<CartState>(set => ({
  // quantity: 33,
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
    addProduct: (product: Product) =>
      set(state => {
        const existingProductIndex = state.cart.findIndex(p => p.id === product.id);
    
        if (existingProductIndex >= 0) {
     
          const newCart = [...state.cart];
          newCart[existingProductIndex].quantity += 1;
          return { cart: newCart };
        } else {
        
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }
      }),
  removeProduct: (slug: string|undefined) =>
    set(state => ({
      cart: state.cart.filter(product => product.slug !== slug)
    }))
}))
