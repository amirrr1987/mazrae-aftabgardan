<script setup lang="ts">
import type { IProduct } from '~/models/product.model'

const props = defineProps<{
  productId: IProduct['id']
  name: string
  logo: string | null | undefined
  quantity: number
  price?: number
  discountPrice?: number
}>()

const emit = defineEmits<{
  remove: [productId: IProduct['id']]
  increment: [productId: IProduct['id']]
  decrement: [productId: IProduct['id']]
}>()

const effectivePrice = computed(() => props.discountPrice ?? props.price ?? 0)

function formatPrice(price: number) {
  return price.toLocaleString('fa-IR') + ' تومان'
}
</script>

<template>
  <div class="flex items-center gap-2 p-2 rounded-lg bg-elevated">
    <ProductThumb
      v-if="logo"
      :src="logo"
      :alt="name"
      img-class="size-12 shrink-0 rounded-lg object-cover"
    />
    <div v-else class="size-12 shrink-0 rounded-lg bg-muted" aria-hidden="true" />

    <div class="flex-1 min-w-0">
      <div class="truncate font-medium text-sm">{{ name }}</div>
      <div v-if="effectivePrice" class="text-xs text-success font-medium">
        {{ formatPrice(effectivePrice) }}
      </div>
    </div>

    <div class="flex items-center gap-1 shrink-0">
      <UButton
        color="neutral"
        variant="ghost"
        size="xs"
        icon="i-lucide-minus"
        square
        @click="emit('decrement', productId)"
      />
      <span class="text-sm font-bold w-5 text-center">{{ quantity }}</span>
      <UButton
        color="neutral"
        variant="ghost"
        size="xs"
        icon="i-lucide-plus"
        square
        @click="emit('increment', productId)"
      />
    </div>

    <UButton
      color="error"
      variant="ghost"
      size="xs"
      icon="i-lucide-trash"
      square
      aria-label="حذف از سبد خرید"
      @click="emit('remove', productId)"
    />
  </div>
</template>
