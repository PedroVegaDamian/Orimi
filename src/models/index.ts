export interface Product {
  id: string
  description: string
  image1: string
  image2: string
  image3: string
  name: string
  price: string
  slug: string
  stock: number
  quantity: number
  subtotal: number
}

export interface CartState {
  total: number,
  cart: Product[],
  increment: (id: string|undefined) => void,
  decrement: (id: string|undefined) => void,
  removeProduct: (slug: string| undefined) => void
  
}