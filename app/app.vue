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

</script>
