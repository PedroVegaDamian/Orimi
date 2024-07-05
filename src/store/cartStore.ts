import { CartState } from '@/models'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/models'
import {
  incrementExistingProduct,
  addNewProductToCart,
  addProductToCartWithQuantity
} from '@/hooks/cartOperation'

export const useCartStore = create<CartState>()(
  persist(
    set => ({
      total: 0,
      cart: [],
      increment: (product: Product,quantityToAdd: number|undefined ) =>
        set(state => {
          const existingProductIndex = state.cart.findIndex(
            p => p.id === product.id
          )
          if(quantityToAdd){
            return addProductToCartWithQuantity(state, product, quantityToAdd)
          }
          if (existingProductIndex >= 0) {
            return incrementExistingProduct(state, existingProductIndex)
          } else {
            return addNewProductToCart(state, product)
          }
        }),
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
  )
)
