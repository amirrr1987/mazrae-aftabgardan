<script setup lang="ts">
import type { IProduct } from '~/models/product.model'

defineProps<{
  product: IProduct
  cartQuantity?: number
}>()

const emit = defineEmits<{
  addToCart: [productId: IProduct['id']]
}>()

const wishlistStore = useWishlistStore()

const categoryLabel = (id: number) =>
  ({ 1: 'قهوه', 2: 'شکلات', 3: 'آبنبات', 4: 'پاستیل' } as Record<number, string>)[id] ?? `دسته ${id}`

function formatPrice(price: number) {
  return price.toLocaleString('fa-IR')
}

function discountPercent(price: number, discount: number) {
  return Math.round((1 - discount / price) * 100)
}
</script>

<template>
  <div class="group relative flex flex-col rounded-2xl bg-elevated border border-default overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
    <!-- Image -->
    <NuxtLink :to="`/${product.slug}`" class="relative block overflow-hidden aspect-4/3">
      <ProductThumb
        :src="product.logo"
        :alt="product.name"
        img-class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <!-- Discount Badge -->
      <div v-if="product.discountPrice" class="absolute top-3 inset-s-3">
        <span class="inline-flex items-center gap-1 rounded-lg bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-sm">
          {{ discountPercent(product.price, product.discountPrice) }}٪−
        </span>
      </div>

      <!-- Wishlist -->
      <button
        class="absolute top-3 inset-e-3 size-8 rounded-full bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm flex items-center justify-center shadow-sm transition-transform hover:scale-110 cursor-pointer"
        :aria-label="wishlistStore.has(product.id) ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'"
        @click.prevent="wishlistStore.toggle(product.id)"
      >
        <UIcon
          :name="wishlistStore.has(product.id) ? 'i-lucide-heart' : 'i-lucide-heart'"
          class="size-4 transition-colors"
          :class="wishlistStore.has(product.id) ? 'text-red-500' : 'text-muted'"
        />
      </button>

      <!-- Category -->
      <div class="absolute bottom-3 inset-e-3">
        <span class="inline-flex items-center rounded-lg bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-default shadow-sm">
          {{ categoryLabel(product.categoryId) }}
        </span>
      </div>
    </NuxtLink>

    <!-- Content -->
    <div class="flex flex-col gap-3 p-4 flex-1">
      <NuxtLink :to="`/${product.slug}`" class="block">
        <h3 class="font-bold text-default text-base leading-snug line-clamp-1 group-hover:text-primary transition-colors">
          {{ product.name }}
        </h3>
      </NuxtLink>

      <p class="text-sm text-muted line-clamp-2 leading-relaxed flex-1">
        {{ product.description }}
      </p>

      <!-- Price -->
      <div class="flex items-baseline gap-2">
        <span class="font-black text-lg text-default">
          {{ formatPrice(product.discountPrice ?? product.price) }}
        </span>
        <span class="text-xs text-muted">تومان</span>
        <span v-if="product.discountPrice" class="text-xs line-through text-muted me-auto">
          {{ formatPrice(product.price) }}
        </span>
      </div>
    </div>

    <!-- Footer -->
    <div class="px-4 pb-4">
      <UButton
        block
        size="md"
        :variant="cartQuantity ? 'soft' : 'solid'"
        icon="i-lucide-shopping-cart"
        @click="emit('addToCart', product.id)"
      >
        {{ cartQuantity ? `${cartQuantity} عدد در سبد` : 'افزودن به سبد' }}
      </UButton>
    </div>
  </div>
</template>
