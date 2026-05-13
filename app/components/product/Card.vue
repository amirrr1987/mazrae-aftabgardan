<script setup lang="ts">
import type { IProduct } from '~/models/product.model'

defineProps<{
  product: IProduct
  cartQuantity?: number
}>()

const emit = defineEmits<{
  addToCart: [productId: IProduct['id']]
}>()

</script>

<template>
  <UCard>
    <template #header>
      <ProductThumb :src="product.logo" :alt="product.name" />
    </template>
    <div class="p-2">
      <ProductSummary :name="product.name" :description="product.description" />
    </div>
    <template #footer>
      <div class="flex flex-wrap gap-2 justify-end">
        <UButton variant="outline" color="neutral" :to="`/${product.slug}`" class="cursor-pointer">
          مشاهده
        </UButton>
        <UButton @click="emit('addToCart', product.id)" class="cursor-pointer">
          افزودن به سبد
          <UIcon name="i-lucide-shopping-cart" />
          <span v-if="cartQuantity" class="text-sm opacity-80">{{ cartQuantity }}</span>
        </UButton>
      </div>
    </template>
  </UCard>
</template>
