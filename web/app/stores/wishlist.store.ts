import type { IProduct } from '~/models/product.model'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref<IProduct['id'][]>([])

  const has = (id: IProduct['id']) => items.value.includes(id)

  function toggle(id: IProduct['id']) {
    if (has(id)) {
      items.value = items.value.filter((i) => i !== id)
    } else {
      items.value.push(id)
    }
  }

  return { items, has, toggle }
})
