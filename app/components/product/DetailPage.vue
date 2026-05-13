<script setup lang="ts">
const route = useRoute()
const { bySlug } = useProductLookup()

const product = computed(() => {
  const slug = route.params.slug
  const key = Array.isArray(slug) ? slug[0] : slug
  if (!key) return null
  return bySlug(String(key))
})

watchEffect(() => {
  useHead({
    title: product.value?.name ?? 'محصول پیدا نشد',
  })
})
</script>

<template>
  <UPageSection
    v-if="product"
    :title="product.name"
    :description="product.description"
  >
    <div class="space-y-4">
      <ProductDetailMedia :src="product.logo" :alt="product.name" />
      <ProductDetailBackLink />
    </div>
  </UPageSection>
  <ProductNotFound v-else />
</template>
