<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-stone-50 dark:bg-stone-900/50">
      <div class="max-w-7xl mx-auto px-4 py-20 md:py-28 flex flex-col items-center text-center relative z-10">
        <div
          v-motion
          :initial="{ opacity: 0, y: -16 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
          class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
        >
          <UIcon name="i-lucide-sparkles" class="size-4" />
          تازه‌ترین محصولات
        </div>

        <h1
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
          class="text-4xl md:text-5xl lg:text-6xl font-black text-default leading-tight mb-4"
        >
          طعم <span class="text-primary">اصیل</span> را بچشید
        </h1>

        <p
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
          class="text-lg md:text-xl text-muted max-w-xl mb-10 leading-relaxed"
        >
          قهوه تازه، شکلات دست‌ساز و تنقلات برتر — مستقیم از مزرعه تا دست شما
        </p>

        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :enter="{ opacity: 1, scale: 1, transition: { duration: 500, delay: 300 } }"
          class="flex flex-wrap gap-3 justify-center"
        >
          <UButton size="xl" icon="i-lucide-arrow-down" trailing>
            مشاهده محصولات
          </UButton>
        </div>
      </div>

      <!-- Decorative circles -->
      <div class="absolute -top-24 -inset-e-24 size-96 rounded-full bg-primary/5 blur-3xl" />
      <div class="absolute -bottom-32 -inset-s-32 size-80 rounded-full bg-secondary/5 blur-3xl" />
    </section>

    <!-- Products -->
    <section class="max-w-7xl mx-auto px-4 py-12">
      <div
        v-motion
        :initial="{ opacity: 0, x: 20 }"
        :visible-once="{ opacity: 1, x: 0, transition: { duration: 500 } }"
        class="flex items-center gap-3 mb-8"
      >
        <div class="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <UIcon name="i-lucide-package" class="size-5 text-primary" />
        </div>
        <h2 class="text-2xl font-bold text-default">محصولات ما</h2>
      </div>
      <ProductGrid :products="productStore.products" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/stores/product.store'

useHead({ title: 'مزرعه آفتابگردان — قهوه، شکلات و تنقلات' })
const productStore = useProductStore()
</script>
