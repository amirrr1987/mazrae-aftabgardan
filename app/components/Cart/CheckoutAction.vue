<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
  }>(),
  {
    label: 'پرداخت و تکمیل سفارش',
  },
)

const emit = defineEmits<{
  checkout: []
}>()
</script>

<template>
  <UCard>
    <UButton
      color="primary"
      block
      aria-label="پرداخت و تکمیل سفارش"
      @click="emit('checkout')"
      class="cursor-pointer"
    >
      <span>{{ label }}</span>
      <UIcon name="i-lucide-shopping-cart" />
    </UButton>
  </UCard>
</template>
