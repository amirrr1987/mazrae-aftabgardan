<script setup lang="ts">
const toast = useToast()

function onCheckout() {
  toast.add({
    title: 'به‌زودی فعال می‌شود',
    description: 'امکان پرداخت آنلاین در حال توسعه است.',
    color: 'info',
    icon: 'i-lucide-info',
  })
}
</script>

<template>
  <UButton color="primary" block icon="i-lucide-credit-card" @click="onCheckout">
    تکمیل سفارش
  </UButton>
</template>
