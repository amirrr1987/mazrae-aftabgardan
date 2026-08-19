<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/" class="flex items-center gap-2 text-default hover:text-primary transition-colors">
        <UIcon name="i-lucide-sun" class="size-6 text-primary" />
        <span class="font-bold text-lg">مزرعه آفتابگردان</span>
      </NuxtLink>
    </template>

    <template #right>
      <div class="flex items-center gap-2">
        <CartPopover />
        <ToggleTheme />
      </div>
    </template>
  </UHeader>

  <UMain>
    <NuxtPage />
  </UMain>

  <UFooter>
    <div class="w-full py-2">
      <div class="flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-sun" class="size-4 text-primary" />
          <span>مزرعه آفتابگردان</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1">
            <UIcon name="i-lucide-coffee" class="size-4" />
            قهوه
          </span>
          <span class="flex items-center gap-1">
            <UIcon name="i-lucide-candy" class="size-4" />
            شکلات و تنقلات
          </span>
          <span>تمامی حقوق محفوظ است © ۱۴۰۳</span>
        </div>
      </div>
    </div>
  </UFooter>
</template>

<script setup lang="ts">
</script>
