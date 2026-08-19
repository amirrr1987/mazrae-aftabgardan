<script setup lang="ts">
const authStore = useAuthStore()
const cartStore = useCartStore()
const mobileMenuOpen = ref(false)

const shopLinks = [
  { to: '/', label: 'همه محصولات' },
  { to: '/?cat=1', label: 'قهوه و نوشیدنی' },
  { to: '/?cat=2', label: 'شکلات' },
  { to: '/?cat=3', label: 'آبنبات' },
  { to: '/?cat=4', label: 'پاستیل' },
]

const infoLinks = [
  { to: '/about', label: 'درباره ما' },
  { to: '/contact', label: 'تماس با ما' },
  { to: '/terms', label: 'قوانین و مقررات' },
  { to: '/profile', label: 'حساب کاربری' },
]

function closeMenu() {
  mobileMenuOpen.value = false
}

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
        cartStore.clearCart()
        navigateTo('/')
        closeMenu()
      },
    },
  ],
])
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <USlideover
      v-model:open="mobileMenuOpen"
      side="right"
      title="منو"
      description="دسترسی سریع"
    >
      <template #body>
        <div class="space-y-4 p-4">
          <div>
            <p class="text-xs font-semibold text-muted uppercase tracking-wider mb-2">محصولات</p>
            <div class="space-y-2">
              <NuxtLink
                v-for="link in shopLinks"
                :key="link.to"
                :to="link.to"
                class="block rounded-xl bg-elevated hover:bg-muted transition-colors px-3 py-2 text-sm text-default"
                @click="closeMenu"
              >
                {{ link.label }}
              </NuxtLink>
            </div>
          </div>

          <USeparator />

          <div>
            <p class="text-xs font-semibold text-muted uppercase tracking-wider mb-2">سایر</p>
            <div class="space-y-2">
              <NuxtLink
                v-for="link in infoLinks"
                :key="link.to"
                :to="link.to"
                class="block rounded-xl bg-elevated hover:bg-muted transition-colors px-3 py-2 text-sm text-default"
                @click="closeMenu"
              >
                {{ link.label }}
              </NuxtLink>
            </div>
          </div>

          <USeparator />

          <div v-if="authStore.isLoggedIn" class="space-y-2">
            <NuxtLink
              to="/profile"
              class="block rounded-xl bg-primary/10 hover:bg-primary/15 transition-colors px-3 py-2 text-sm text-primary font-medium"
              @click="closeMenu"
            >
              حساب کاربری
            </NuxtLink>
            <UButton
              color="error"
              variant="soft"
              block
              icon="i-lucide-log-out"
              @click="
                () => {
                  authStore.logout()
                  cartStore.clearCart()
                  navigateTo('/')
                  closeMenu()
                }
              "
            >
              خروج
            </UButton>
          </div>

          <div v-else class="space-y-2">
            <NuxtLink
              to="/auth/login"
              class="block rounded-xl bg-primary/10 hover:bg-primary/15 transition-colors px-3 py-2 text-sm text-primary font-medium"
              @click="closeMenu"
            >
              ورود
            </NuxtLink>
            <NuxtLink
              to="/auth/register"
              class="block rounded-xl bg-primary/10 hover:bg-primary/15 transition-colors px-3 py-2 text-sm text-primary font-medium"
              @click="closeMenu"
            >
              ثبت‌نام
            </NuxtLink>
          </div>
        </div>
      </template>
    </USlideover>

    <header class="sticky top-0 z-50 bg-elevated/80 backdrop-blur-md border-b border-default">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-6">
          <NuxtLink to="/" class="flex items-center gap-2 group">
            <div class="size-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <UIcon name="i-lucide-sun" class="size-5 text-primary" />
            </div>
            <span class="font-bold text-lg text-default hidden sm:inline">مزرعه آفتابگردان</span>
          </NuxtLink>

          <!-- Desktop nav -->
          <nav class="hidden lg:flex items-center gap-1">
            <NuxtLink
              v-for="link in shopLinks"
              :key="link.to"
              :to="link.to"
              class="text-sm px-3 py-2 rounded-xl text-muted hover:text-primary hover:bg-elevated transition-colors"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>

        <div class="flex items-center gap-1">
          <!-- Mobile hamburger -->
          <UButton
            class="lg:hidden"
            color="neutral"
            variant="ghost"
            square
            aria-label="باز کردن منو"
            @click="mobileMenuOpen = true"
          >
            <UIcon name="i-lucide-menu" class="size-5" />
          </UButton>

          <CartPopover />

          <!-- کاربر لاگین کرده -->
          <UDropdownMenu
            v-if="authStore.isLoggedIn"
            :items="userMenuItems"
            class="hidden sm:block"
          >
            <UButton color="neutral" variant="ghost" square aria-label="منوی کاربر">
              <div class="size-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                {{ initials }}
              </div>
            </UButton>
          </UDropdownMenu>

          <!-- ورود / ثبت‌نام -->
          <template v-else>
            <UButton
              to="/auth/login"
              color="neutral"
              variant="ghost"
              size="sm"
              icon="i-lucide-log-in"
              class="hidden sm:flex"
            >
              ورود
            </UButton>
            <UButton to="/auth/register" size="sm" class="hidden sm:flex">
              ثبت‌نام
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
      <div class="max-w-7xl mx-auto px-4 py-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div class="lg:col-span-2">
            <div class="flex items-center gap-2 mb-3">
              <div class="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                <UIcon name="i-lucide-sun" class="size-4 text-primary" />
              </div>
              <span class="font-bold text-default">مزرعه آفتابگردان</span>
            </div>
            <p class="text-sm text-muted leading-relaxed max-w-xs">
              بهترین قهوه، شکلات دست‌ساز و تنقلات برتر — مستقیم از مزرعه تا دست شما.
            </p>
          </div>

          <div>
            <p class="font-semibold text-default text-sm mb-3">فروشگاه</p>
            <ul class="space-y-2">
              <li v-for="link in shopLinks" :key="link.to">
                <NuxtLink :to="link.to" class="text-sm text-muted hover:text-primary transition-colors">{{ link.label }}</NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <p class="font-semibold text-default text-sm mb-3">اطلاعات</p>
            <ul class="space-y-2">
              <li v-for="link in infoLinks" :key="link.to">
                <NuxtLink :to="link.to" class="text-sm text-muted hover:text-primary transition-colors">{{ link.label }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <USeparator />

        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted pt-6">
          <span>تمامی حقوق محفوظ است © ۱۴۰۳ مزرعه آفتابگردان</span>
          <div class="flex items-center gap-3">
            <NuxtLink to="/terms" class="hover:text-primary transition-colors">قوانین</NuxtLink>
            <NuxtLink to="/contact" class="hover:text-primary transition-colors">تماس با ما</NuxtLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
