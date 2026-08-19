<script setup lang="ts">
defineProps<{
  total: number
}>()
</script>

<template>
  <UButton color="neutral" variant="ghost" square aria-label="سبد خرید" class="relative">
    <UIcon name="i-lucide-shopping-bag" class="size-5" />
    <span
      v-if="total > 0"
      class="absolute -top-1 -inset-e-1 size-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center"
    >
      {{ total }}
    </span>
  </UButton>
</template>
