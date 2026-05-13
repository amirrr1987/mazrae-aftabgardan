<script setup lang="ts">
withDefaults(
  defineProps<{
    to?: string
    label?: string
  }>(),
  {
    to: '/',
    label: 'بازگشت به فهرست محصولات',
  },
)
</script>

<template>
  <UButton :to="to" variant="soft" color="neutral" icon="i-lucide-house">
    {{ label }}
  </UButton>
</template>
