import { CartState } from '@/models'
import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      set => ({
        total: 0,
        cart: [],
        increment: (id: string | undefined) =>
          set(state => ({
            cart: state.cart.map(product =>
              product.id === id && product.stock > 0
                ? {
                    ...product,
                    quantity: product.quantity + 1 || 1,
                    stock: product.stock - 1
                  }
                : product
            )
          })),
        decrement: (id: string | undefined) =>
          set(state => ({
            cart: state.cart.map(product =>
              product.id === id && product.quantity > 0
                ? {
                    ...product,
                    quantity: product.quantity - 1 || 1,
                    stock: product.stock + 1
                  }
                : product
            )
          })),
        removeProduct: (slug: string | undefined) =>
          set(state => ({
            cart: state.cart.filter(product => product.slug !== slug)
          })),
        multiply: () => {
          set(state => ({
            cart: state.cart.map(product => ({
              ...product,
              subtotal: product.price * product.quantity
            }))
          }))
        },
        totalSum: () => {
          set(state => {
            const total = state.cart.reduce(
              (sum, product) => sum + (product.subtotal ?? product.price),
              0
            )
            return { ...state, total }
          })
        },
        isStock: (id: string | undefined) => {
          set(state => ({
            cart: state.cart.map(product =>
              product.id === id
                ? { ...product, isStock: product.stock > 0 }
                : { ...product, isStock: false }
            )
          }))
        },
        resetCart: () =>
          set(() => ({
            total: 0,
            cart: []
          }))
      }),
      { name: 'CART ITEMS ORIMI' }
    ),
    { name: 'cart-store' }
  )
)
