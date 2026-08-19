<script setup lang="ts">
import type { IProduct } from '~/models/product.model'

defineProps<{
  product: IProduct
  cartQuantity?: number
}>()

const emit = defineEmits<{
  addToCart: [productId: IProduct['id']]
}>()

const categoryLabel = (id: number) =>
  ({ 1: 'قهوه و نوشیدنی', 2: 'شکلات', 3: 'آبنبات', 4: 'پاستیل' } as Record<number, string>)[id] ?? `دسته ${id}`

const categoryColor = (id: number): 'primary' | 'secondary' | 'success' | 'warning' =>
  ({ 1: 'primary', 2: 'secondary', 3: 'success', 4: 'warning' } as Record<number, 'primary' | 'secondary' | 'success' | 'warning'>)[id] ?? 'primary'

function formatPrice(price: number) {
  return price.toLocaleString('fa-IR') + ' تومان'
}
</script>

<template>
  <UCard class="overflow-hidden group">
    <template #header>
      <div class="relative overflow-hidden">
        <ProductThumb
          :src="product.logo"
          :alt="product.name"
          img-class="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div class="absolute top-2 inset-e-2 flex flex-col gap-1">
          <UBadge :color="categoryColor(product.categoryId)" variant="solid" size="sm">
            {{ categoryLabel(product.categoryId) }}
          </UBadge>
          <UBadge v-if="product.discountPrice" color="error" variant="solid" size="sm">
            تخفیف
          </UBadge>
        </div>
        <div v-if="cartQuantity" class="absolute top-2 inset-s-2">
          <UBadge color="primary" variant="solid" size="sm">
            {{ cartQuantity }} در سبد
          </UBadge>
        </div>
      </div>
    </template>

    <div class="flex flex-col gap-2 p-1">
      <ProductSummary :name="product.name" :description="product.description" />

      <div class="flex items-center gap-2 mt-1">
        <span v-if="product.discountPrice" class="font-bold text-success text-base">
          {{ formatPrice(product.discountPrice) }}
        </span>
        <span
          class="text-sm"
          :class="product.discountPrice ? 'line-through text-muted' : 'font-bold text-default text-base'"
        >
          {{ formatPrice(product.price) }}
        </span>
      </div>
    </div>

    <template #footer>
      <div class="flex flex-wrap gap-2 justify-end">
        <UButton variant="outline" color="neutral" :to="`/${product.slug}`" size="sm">
          مشاهده
        </UButton>
        <UButton size="sm" icon="i-lucide-shopping-cart" @click="emit('addToCart', product.id)">
          افزودن به سبد
          <span v-if="cartQuantity" class="text-xs opacity-80 ms-1">({{ cartQuantity }})</span>
        </UButton>
      </div>
    </template>
  </UCard>
</template>
