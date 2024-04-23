import { Product } from "@/models";
import { create } from "zustand";

interface CartState {
 products: Product[];
 addProduct: (product: Product) => void; 
}

export const useCartStore = create<CartState>( set => ({
  products: [],
  addProduct: product => set((state) => ({
    products: [...state.products, product]
  }))
}))