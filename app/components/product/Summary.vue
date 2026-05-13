<script setup lang="ts">
defineProps<{
  name: string
  description: string
}>()
</script>

<template>
  <div class="space-y-2">
    <h3 class="font-semibold text-highlighted">
      {{ name }}
    </h3>
    <p class="text-sm text-muted line-clamp-2">
      {{ description }}
    </p>
  </div>
</template>
