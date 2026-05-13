<script setup lang="ts">
defineProps<{
  src: string
  alt: string
}>()
</script>

<template>
  <NuxtImg
    :src="src"
    :alt="alt"
    class="max-h-96 w-full rounded-lg object-cover ring ring-default"
  />
</template>
