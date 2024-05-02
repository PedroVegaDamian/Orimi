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
}

export interface CartState {
  cart: Product[],
  increment: (id: string|undefined) => void,
  decrement: (id: string|undefined) => void,
  addProduct: (product: Product) => void,
  removeProduct: (slug: string| undefined) => void
  
}