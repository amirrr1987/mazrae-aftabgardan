import type { IProduct } from "~/models/product.model"
import { productMock } from "~/mock/product.mock"

export const useProductStore = defineStore('product', () => {
  const products = ref<IProduct[]>(productMock)
  
  return {
    products
  }
})