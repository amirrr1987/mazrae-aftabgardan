<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
  }>(),
  {
    title: 'سبد خرید خالی است',
    description:
      'هنوز کالایی اضافه نکرده‌اید؛ از صفحهٔ محصولات چند قلم به سبد بیفزایید.',
  },
)
</script>

<template>
  <UEmpty :title="title" :description="description" />
</template>
