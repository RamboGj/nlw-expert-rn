import { ProductProps } from '@/utils/data/products'
import { ProductCartProps } from '../cartStore'

export function add(products: ProductCartProps[], newProduct: ProductProps) {
  const existingProduct = products.find(({ id }) => newProduct.id === id)

  if (existingProduct) {
    return products.map((product) =>
      existingProduct.id === product.id
        ? { ...product, quantity: product.quantity + 1 }
        : product,
    )
  }

  return [...products, { ...newProduct, quantity: 1 }]
}

export function remove(
  products: ProductCartProps[],
  productToRemoveId: string,
) {
  const updatedProducts = products.map((product) =>
    product.id === productToRemoveId
      ? {
          ...product,
          quantity: product.quantity > 1 ? product.quantity - 1 : 0,
        }
      : product,
  )

  return updatedProducts.filter((product) => product.quantity > 0)
}
