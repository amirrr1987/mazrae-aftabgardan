<template>
  <div>
    <!-- Hero Section -->
    <div class="relative bg-linear-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900 py-16 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <UBadge color="primary" variant="subtle" size="lg" class="mb-4">
          <UIcon name="i-lucide-sun" class="size-4 me-1" />
          مزرعه آفتابگردان
        </UBadge>
        <h1 class="text-4xl font-bold text-default mb-4 leading-tight">
          بهترین قهوه، شکلات و تنقلات
        </h1>
        <p class="text-lg text-muted mb-8 max-w-2xl mx-auto">
          محصولات تازه و باکیفیت را مستقیم از مزرعه تا سفره‌ی شما تهیه کنید
        </p>
        <div class="flex flex-wrap gap-3 justify-center">
          <UButton size="lg" icon="i-lucide-shopping-bag">
            خرید کنید
          </UButton>
          <UButton size="lg" variant="outline" color="neutral" icon="i-lucide-info">
            درباره ما
          </UButton>
        </div>
      </div>
    </div>

    <!-- Category Quick Filters -->
    <div class="bg-elevated border-b border-default">
      <div class="max-w-6xl mx-auto px-4 py-4 flex flex-wrap gap-2 justify-center">
        <UButton
          v-for="cat in categories"
          :key="cat.id"
          :color="cat.color"
          variant="soft"
          size="sm"
          :icon="cat.icon"
        >
          {{ cat.label }}
        </UButton>
      </div>
    </div>

    <!-- Products Section -->
    <UPageSection>
      <template #title>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-package" class="size-6 text-primary" />
          محصولات ما
        </div>
      </template>
      <ProductGrid :products="productStore.products" />
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/stores/product.store'

useHead({ title: 'مزرعه آفتابگردان — قهوه، شکلات و تنقلات' })
const productStore = useProductStore()

const categories = [
  { id: 1, label: 'قهوه و نوشیدنی', icon: 'i-lucide-coffee', color: 'primary' as const },
  { id: 2, label: 'شکلات', icon: 'i-lucide-candy', color: 'secondary' as const },
  { id: 3, label: 'آبنبات', icon: 'i-lucide-star', color: 'success' as const },
  { id: 4, label: 'پاستیل', icon: 'i-lucide-heart', color: 'warning' as const },
]
</script>
