<template>
  <div class="min-h-screen flex flex-col">
    <header class="sticky top-0 z-50 bg-elevated/80 backdrop-blur-md border-b border-default">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="size-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <UIcon name="i-lucide-sun" class="size-5 text-primary" />
          </div>
          <span class="font-bold text-lg text-default hidden sm:inline">مزرعه آفتابگردان</span>
        </NuxtLink>

        <div class="flex items-center gap-1">
          <CartPopover />
          <ToggleTheme />
        </div>
      </div>
    </header>

    <main class="flex-1">
      <NuxtPage />
    </main>

    <footer class="border-t border-default bg-elevated mt-12">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-sun" class="size-4 text-primary" />
            <span class="font-medium">مزرعه آفتابگردان</span>
          </div>
          <span>تمامی حقوق محفوظ است © ۱۴۰۳</span>
        </div>
      </div>
    </footer>
  </div>
</template>
