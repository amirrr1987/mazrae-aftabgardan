<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
    homeLabel?: string
  }>(),
  {
    title: 'محصول پیدا نشد',
    description: 'آدرس را بررسی کنید یا به فهرست محصولات برگردید.',
    homeLabel: 'رفتن به صفحهٔ اصلی',
  },
)
</script>

<template>
  <UPageSection :title="title" :description="description">
    <UButton to="/" color="primary">
      {{ homeLabel }}
    </UButton>
  </UPageSection>
</template>
