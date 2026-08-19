<script setup lang="ts">
const authStore = useAuthStore()
const cartStore = useCartStore()

const initials = computed(() => {
  const u = authStore.user
  if (!u) return ''
  return (u.firstName?.[0] ?? '') + (u.lastName?.[0] ?? '')
})

const userMenuItems = computed(() => [
  [
    {
      label: `${authStore.user?.firstName} ${authStore.user?.lastName}`,
      icon: 'i-lucide-user',
      disabled: true,
    },
  ],
  [
    { label: 'پروفایل', icon: 'i-lucide-user-pen', to: '/profile' },
  ],
  [
    {
      label: 'خروج',
      icon: 'i-lucide-log-out',
      color: 'error' as const,
      onSelect: () => {
        authStore.logout()
        cartStore.cart.splice(0)
        navigateTo('/')
      },
    },
  ],
])
</script>

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

          <!-- کاربر لاگین کرده -->
          <UDropdownMenu
            v-if="authStore.isLoggedIn"
            :items="userMenuItems"
          >
            <UButton color="neutral" variant="ghost" square aria-label="منوی کاربر">
              <div class="size-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                {{ initials }}
              </div>
            </UButton>
          </UDropdownMenu>

          <!-- ورود / ثبت‌نام -->
          <template v-else>
            <UButton to="/auth/login" color="neutral" variant="ghost" size="sm" icon="i-lucide-log-in" class="hidden sm:flex">
              ورود
            </UButton>
            <UButton to="/auth/register" size="sm" class="hidden sm:flex">
              ثبت‌نام
            </UButton>
            <UButton to="/auth/login" color="neutral" variant="ghost" square size="sm" class="sm:hidden">
              <UIcon name="i-lucide-user" class="size-5" />
            </UButton>
          </template>

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
