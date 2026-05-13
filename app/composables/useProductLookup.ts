import type { IProduct } from '~/models/product.model'

export function useProductLookup() {
  const productStore = useProductStore()

  function byId(id: IProduct['id']): IProduct | null {
    return productStore.products.find((p: IProduct) => p.id === id) ?? null
  }

  function bySlug(slug: string): IProduct | null {
    return productStore.products.find((p: IProduct) => p.slug === slug) ?? null
  }

  return { byId, bySlug }
}
