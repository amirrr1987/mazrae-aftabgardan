import type { ICart } from "~/models/cart.model"

type CartProductId = ICart['productId']

export const useCartStore = defineStore('cart', () => {
  const cart = ref<ICart[]>([])

  const totalItems = computed(() => cart.value.reduce((acc, i) => acc + i.quantity, 0))

  function addToCart(productId: CartProductId) {
    const item = cart.value.find((p) => p.productId === productId)
    if (item) {
      item.quantity += 1
    } else {
      cart.value.push({ productId, quantity: 1 })
    }
  }

  function decrementFromCart(productId: CartProductId) {
    const item = cart.value.find((p) => p.productId === productId)
    if (!item) return
    if (item.quantity > 1) {
      item.quantity -= 1
    } else {
      cart.value = cart.value.filter((p) => p.productId !== productId)
    }
  }

  function removeAllFromCart(productId: CartProductId) {
    cart.value = cart.value.filter((p) => p.productId !== productId)
  }

  function clearCart() {
    cart.value = []
  }

  return {
    cart,
    totalItems,
    addToCart,
    decrementFromCart,
    removeAllFromCart,
    clearCart,
  }
})