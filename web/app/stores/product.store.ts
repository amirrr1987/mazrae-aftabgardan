import type { IProduct } from "~/models/product.model"
import { productMock } from "~/mock/product.mock"

export const useProductStore = defineStore('product', () => {
  const products = ref<IProduct[]>([])
  const loading = ref(false)

  async function fetchProducts() {
    if (products.value.length) return
    loading.value = true
    await new Promise((r) => setTimeout(r, 800))
    products.value = productMock
    loading.value = false
  }

  return { products, loading, fetchProducts }
})
