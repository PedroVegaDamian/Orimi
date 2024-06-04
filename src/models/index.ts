export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image1: string;
  image2: string;
  image3: string;
  price: number;
  slug: string;
  stock: number;
  quantity: number;
  subtotal: number;
  isStock: boolean;
}

export interface CartState {
  total: number
  cart: Product[]
  increment: (id: string | undefined) => void
  decrement: (id: string | undefined) => void
  removeProduct: (slug: string | undefined) => void
  multiply: () => void
  totalSum: () => void
  isStock: (id: string | undefined) => void
}


export enum Categories {
  All = 'All',
  Birds = 'birds',
  Mammals = 'mammals',
  Amphibians = 'amphibians',
  Fish = 'fish',
  Insects = 'insects',
  Reptiles = 'reptiles',
}
