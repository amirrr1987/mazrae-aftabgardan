<script setup lang="ts">
import type { IProduct } from '~/models/product.model'

const props = defineProps<{
  products: IProduct[]
}>()

const cartStore = useCartStore()

function cartQuantityFor(productId: IProduct['id']) {
  return cartStore.cart.find((c) => c.productId === productId)?.quantity
}

const categories = [
  { id: 1, label: 'قهوه و نوشیدنی', icon: 'i-lucide-coffee' },
  { id: 2, label: 'شکلات', icon: 'i-lucide-candy' },
  { id: 3, label: 'آبنبات', icon: 'i-lucide-star' },
  { id: 4, label: 'پاستیل', icon: 'i-lucide-heart' },
]

const searchInput = ref('')
const searchQuery = ref('')
const selectedCategoryId = ref<number | null>(null)
const mobileFilterOpen = ref(false)

const updateSearch = useDebounceFn((val: string) => {
  searchQuery.value = val
}, 300)

const categoryIds = computed(() => {
  const ids = new Set(props.products.map((p) => p.categoryId))
  return [...ids].sort((a, b) => a - b)
})

const hasActiveFilters = computed(
  () => selectedCategoryId.value != null || searchInput.value.trim().length > 0,
)

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
  selectedCategoryId.value = id === selectedCategoryId.value ? null : id
}

function clearFilters() {
  searchInput.value = ''
  searchQuery.value = ''
  selectedCategoryId.value = null
}
</script>

<template>
  <div class="flex gap-8 items-start">

    <!-- Aside فیلتر — دسکتاپ -->
    <aside class="hidden lg:flex flex-col gap-5 w-60 shrink-0 sticky top-24">
      <!-- Search -->
      <div class="flex flex-col gap-1.5">
        <span class="text-xs font-semibold text-muted uppercase tracking-wider">جستجو</span>
        <UInput
          v-model="searchInput"
          placeholder="نام محصول…"
          icon="i-lucide-search"
          size="sm"
          @update:model-value="updateSearch"
        />
      </div>

      <USeparator />

      <!-- Categories -->
      <div class="flex flex-col gap-2">
        <span class="text-xs font-semibold text-muted uppercase tracking-wider">دسته‌بندی</span>

        <button
          class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"
          :class="selectedCategoryId === null
            ? 'bg-primary/10 text-primary'
            : 'text-muted hover:text-default hover:bg-elevated'"
          @click="setCategory(null)"
        >
          <UIcon name="i-lucide-layout-grid" class="size-4 shrink-0" />
          همه محصولات
          <span class="me-auto text-xs bg-elevated px-1.5 py-0.5 rounded-md">{{ props.products.filter(p => p.isActive).length }}</span>
        </button>

        <button
          v-for="cat in categories.filter(c => categoryIds.includes(c.id))"
          :key="cat.id"
          class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"
          :class="selectedCategoryId === cat.id
            ? 'bg-primary/10 text-primary'
            : 'text-muted hover:text-default hover:bg-elevated'"
          @click="setCategory(cat.id)"
        >
          <UIcon :name="cat.icon" class="size-4 shrink-0" />
          {{ cat.label }}
          <span class="me-auto text-xs bg-elevated px-1.5 py-0.5 rounded-md">
            {{ props.products.filter(p => p.isActive && p.categoryId === cat.id).length }}
          </span>
        </button>
      </div>

      <template v-if="hasActiveFilters">
        <USeparator />
        <UButton size="sm" variant="soft" color="neutral" icon="i-lucide-x" block @click="clearFilters">
          پاک کردن فیلترها
        </UButton>
      </template>
    </aside>

    <!-- محتوای اصلی -->
    <div class="flex-1 min-w-0">

      <!-- نوار بالا: موبایل‌فیلتر + تعداد -->
      <div class="flex items-center justify-between mb-5 gap-3">
        <p class="text-sm text-muted">
          <span class="font-semibold text-default">{{ filteredProducts.length }}</span>
          محصول
        </p>

        <!-- دکمه فیلتر موبایل -->
        <UButton
          class="lg:hidden"
          size="sm"
          color="neutral"
          variant="outline"
          :icon="mobileFilterOpen ? 'i-lucide-x' : 'i-lucide-sliders-horizontal'"
          @click="mobileFilterOpen = !mobileFilterOpen"
        >
          فیلتر
          <UBadge v-if="hasActiveFilters" color="primary" variant="solid" size="xs" class="ms-1">فعال</UBadge>
        </UButton>
      </div>

      <!-- فیلتر موبایل — Collapsible -->
      <div
        v-if="mobileFilterOpen"
        class="lg:hidden mb-5 p-4 rounded-2xl border border-default bg-elevated flex flex-col gap-4"
      >
        <UInput
          v-model="searchInput"
          placeholder="جستجو…"
          icon="i-lucide-search"
          size="sm"
          @update:model-value="updateSearch"
        />
        <div class="flex flex-wrap gap-2">
          <UButton
            size="xs"
            :variant="selectedCategoryId === null ? 'solid' : 'outline'"
            color="neutral"
            @click="setCategory(null)"
          >
            همه
          </UButton>
          <UButton
            v-for="cat in categories.filter(c => categoryIds.includes(c.id))"
            :key="cat.id"
            size="xs"
            :icon="cat.icon"
            :variant="selectedCategoryId === cat.id ? 'solid' : 'outline'"
            color="neutral"
            @click="setCategory(cat.id)"
          >
            {{ cat.label }}
          </UButton>
        </div>
        <UButton v-if="hasActiveFilters" size="sm" variant="soft" color="neutral" icon="i-lucide-x" @click="clearFilters">
          پاک کردن فیلترها
        </UButton>
      </div>

      <!-- Grid -->
      <div
        v-if="filteredProducts.length"
        class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
      >
        <div
          v-for="(product, i) in filteredProducts"
          :key="product.id"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 400, delay: i * 60 } }"
        >
          <ProductCard
            :product="product"
            :cart-quantity="cartQuantityFor(product.id)"
            @add-to-cart="cartStore.addToCart"
          />
        </div>
      </div>

      <div v-else class="py-20 text-center">
        <UIcon name="i-lucide-search-x" class="size-12 text-muted mx-auto mb-3" />
        <p class="font-semibold text-default">محصولی یافت نشد</p>
        <p class="text-sm text-muted mt-1">فیلترها را تغییر دهید یا جستجو را پاک کنید</p>
        <UButton size="sm" variant="soft" color="neutral" class="mt-4" @click="clearFilters">پاک کردن</UButton>
      </div>
    </div>
  </div>
</template>
