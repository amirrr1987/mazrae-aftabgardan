import type { ICart } from "~/models/cart.model"
import type { IProduct } from "~/models/product.model"

export const useCartStore = defineStore('cart', () => {
  const cart = ref<ICart[]>([])
  const addToCart = (productId: Omit<ICart, 'createAt' | 'updateAt' | 'id'>['productId']) => {
    // finf Product by id in Card 
    const product = cart.value.find(p => p.productId === productId)
    if (product) {
      product.quantity += 1
    } else {
      cart.value.push({ productId, quantity: 1 })
    }
  }

  const removeFromCart = (productId: Omit<ICart, 'createAt' | 'updateAt' | 'id'>['productId']) => {
    const product = cart.value.find(p => p.productId === productId)
    if (product) {
      product.quantity -= 1
    }
    if (product && product.quantity === 0) {
      cart.value = cart.value.filter(p => p.productId !== productId)
    }
  }

  return {
    cart,
    addToCart,
    removeFromCart
  }
})