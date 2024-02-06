import { ProductProps } from '@/utils/data/products'
import { create } from 'zustand'
import * as cartInMemory from './helpers/cartInMemory'

export interface ProductCartProps extends ProductProps {
  quantity: number
}

interface CartStateProps {
  products: ProductCartProps[]
  add: (product: ProductProps) => void
}

export const useCartStore = create<CartStateProps>((set) => ({
  products: [],
  add: (product: ProductProps) =>
    set((state) => ({ products: cartInMemory.add(state.products, product) })),
}))
