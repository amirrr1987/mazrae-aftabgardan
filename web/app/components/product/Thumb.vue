<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string
    alt: string
    title?: string
    imgClass?: string
  }>(),
  {
    title: undefined,
    imgClass: 'w-full h-80 object-cover',
  },
)
</script>

<template>
  <NuxtImg
    :src="src"
    :alt="alt"
    :title="title ?? alt"
    :class="imgClass"
  />
</template>
