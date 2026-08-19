<script setup lang="ts">
import type { IProduct } from '~/models/product.model'

const props = defineProps<{
  products: IProduct[]
}>()

const cartStore = useCartStore()

function cartQuantityFor(productId: IProduct['id']) {
  return cartStore.cart.find((c) => c.productId === productId)?.quantity
}

const categoryLabel = (id: number) =>
  (
    {
      1: 'قهوه و نوشیدنی',
      2: 'شکلات',
      3: 'آبنبات',
      4: 'پاستیل',
    } as Record<number, string>
  )[id] ?? `دسته ${id}`

const searchQuery = ref('')
const selectedCategoryId = ref<number | null>(null)

const categoryIds = computed(() => {
  const ids = new Set(props.products.map((p) => p.categoryId))
  return [...ids].sort((a, b) => a - b)
})

const hasActiveFilters = computed(() => {
  return selectedCategoryId.value != null || searchQuery.value.trim().length > 0
})

const filteredProducts = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return props.products
    .filter((p) => p.isActive)
    .filter((p) => selectedCategoryId.value == null || p.categoryId === selectedCategoryId.value)
    .filter((p) => {
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q)
      )
    })
})

function setCategory(id: number | null) {
  if (id === null) {
    selectedCategoryId.value = null
    return
  }
  selectedCategoryId.value = selectedCategoryId.value === id ? null : id
}


function clearFilters() {
  searchQuery.value = ''
  selectedCategoryId.value = null
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <UPopover>
        <UButton color="neutral" variant="outline" class="gap-2">
          <UIcon name="i-lucide-filter" class="size-4" />
          فیلتر
          <UBadge v-if="hasActiveFilters" color="primary" variant="subtle" size="xs">
            فعال
          </UBadge>
        </UButton>

        <template #content>
          <div class="w-72 space-y-4 p-3">
            <UFormField label="جستجو">
              <UInput v-model="searchQuery" placeholder="نام، توضیح یا اسلاگ…" icon="i-lucide-search" size="sm" />
            </UFormField>

            <UFormField label="دسته‌بندی">
              <div class="flex flex-wrap gap-1.5">
                <UButton size="xs" :variant="selectedCategoryId === null ? 'solid' : 'outline'" color="neutral"
                  @click="setCategory(null)">
                  همه
                </UButton>
                <UButton v-for="cid in categoryIds" :key="cid" size="xs"
                  :variant="selectedCategoryId === cid ? 'solid' : 'outline'" color="neutral" @click="setCategory(cid)">
                  {{ categoryLabel(cid) }}
                </UButton>
              </div>
            </UFormField>

            <UButton v-if="hasActiveFilters" color="neutral" variant="soft" block size="sm" icon="i-lucide-x"
              @click="clearFilters">
              پاک کردن فیلترها
            </UButton>
          </div>
        </template>
      </UPopover>

      <p v-if="hasActiveFilters" class="text-sm text-muted">
        {{ filteredProducts.length }} محصول
      </p>
    </div>

    <div v-if="filteredProducts.length" class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product"
        :cart-quantity="cartQuantityFor(product.id)" @add-to-cart="cartStore.addToCart" />
    </div>
    <UEmpty v-else title="محصولی یافت نشد" description="فیلترها را عوض کنید یا جستجو را خالی کنید." />
  </div>
</template>
