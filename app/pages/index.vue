<template>
  <UPageSection title="محصولات">
    <ProductGrid :products="productStore.products" />
  </UPageSection>
</template>

<script setup lang="ts">
import { useProductStore } from '~/stores/product.store'

useHead({ title: 'محصولات' })
const productStore = useProductStore()


</script>
