<script setup lang="ts">
import type { IProduct } from '~/models/product.model'

defineProps<{
  productId: IProduct['id']
  name: string
  logo: string | null | undefined
  quantity: number
}>()

const emit = defineEmits<{
  remove: [productId: IProduct['id']]
}>()
</script>

<template>
  <UCard>
    <div class="flex items-center gap-2">
      <div class="flex flex-1 items-center gap-2">
        <ProductThumb
          v-if="logo"
          :src="logo"
          :alt="name"
          img-class="size-10 shrink-0 rounded object-cover"
        />
        <div
          v-else
          class="size-10 shrink-0 rounded bg-muted"
          aria-hidden="true"
        />
        <div class="min-w-0">
          <div class="truncate font-medium">
            {{ name }}
          </div>
          <div class="text-sm text-muted">
            {{ quantity }} عدد
          </div>
        </div>
      </div>
      <UButton
        color="error"
        variant="ghost"
        square
        aria-label="حذف از سبد خرید"
        @click="emit('remove', productId)"
        class="cursor-pointer"
      >
        <UIcon name="i-lucide-trash" />
      </UButton>
    </div>
  </UCard>
</template>
