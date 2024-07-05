import { CartState, Product } from '@/models'

// add another function that chekc if we have a value that comes from the input

export const incrementExistingProduct = (
  state: CartState,
  existingProductIndex: number
) => {
  if (state.cart[existingProductIndex].stock > 0) {
    const updatedCart = state.cart.map((p, index) => {
      if (index === existingProductIndex) {
        return { ...p, quantity: p.quantity + 1, stock: p.stock - 1 }
      }
      return p
    })
    return { ...state, cart: updatedCart }
  }
  return state
}

export const addNewProductToCart = (state: CartState, product: Product) => {
  if (product.stock > 0) {
    const newProduct = { ...product, quantity: 1, stock: product.stock - 1 }
    return { ...state, cart: [...state.cart, newProduct] }
  }
  return state
}

export const addProductToCartWithQuantity = (
  state: CartState,
  product: Product,
  quantityToAdd: number
) => {
  const effectiveQuantityToAdd = Math.min(quantityToAdd, product.stock)

  if (effectiveQuantityToAdd > 0) {
    const existingProductIndex = state.cart.findIndex(p => p.id === product.id)

    if (existingProductIndex >= 0) {
      const updatedCart = state.cart.map((p, index) => {
        if (index === existingProductIndex) {
          return {
            ...p,
            quantity: effectiveQuantityToAdd,
            stock: p.stock - effectiveQuantityToAdd
          }
        }
        return p
      })
      return { ...state, cart: updatedCart }
    } else {
      const newProduct = {
        ...product,
        quantity: effectiveQuantityToAdd,
        stock: product.stock - effectiveQuantityToAdd
      }
      return { ...state, cart: [...state.cart, newProduct] }
    }
  }
  return state
}
