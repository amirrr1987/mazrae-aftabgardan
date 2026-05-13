<script setup lang="ts">
defineProps<{
  total: number
}>()
</script>

<template>
  <UButton color="neutral" variant="ghost" square aria-label="سبد خرید" class="cursor-pointer">
    <UIcon name="i-lucide-shopping-cart" />
    <span class="text-sm text-gray-500" v-if="total > 0">{{ total }}</span>
  </UButton>
</template>
