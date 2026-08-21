<template>
  <UApp :locale="fa_ir" dir="rtl">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { fa_ir } from '@nuxt/ui/runtime/locale/index.js'

useSeoMeta({
  ogSiteName: 'مزرعه آفتابگردان',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  description: 'بهترین قهوه، شکلات دست‌ساز و تنقلات برتر — مستقیم از مزرعه تا دست شما',
  ogDescription: 'بهترین قهوه، شکلات دست‌ساز و تنقلات برتر — مستقیم از مزرعه تا دست شما',
})

useHead({
  htmlAttrs: { lang: 'fa', dir: 'rtl' },
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
})
</script>
