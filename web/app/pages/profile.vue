<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({ middleware: 'auth' })
useHead({ title: 'پروفایل — مزرعه آفتابگردان' })

const authStore = useAuthStore()
const cartStore = useCartStore()
const orderStore = useOrderStore()
const toast = useToast()

function formatPrice(p: number) {
  return p.toLocaleString('fa-IR')
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric', month: 'long', day: 'numeric',
  }).format(new Date(d))
}

const activeTab = ref('info')

const tabs = [
  { value: 'info', label: 'اطلاعات شخصی', icon: 'i-lucide-user' },
  { value: 'orders', label: 'سفارش‌ها', icon: 'i-lucide-package' },
  { value: 'security', label: 'امنیت', icon: 'i-lucide-shield' },
]

// — بخش ویرایش اطلاعات
const profileSchema = z.object({
  firstName: z.string().min(2, 'حداقل ۲ کاراکتر'),
  lastName: z.string().min(2, 'حداقل ۲ کاراکتر'),
  phone: z.string().optional(),
  address: z.string().optional(),
})
type ProfileSchema = z.output<typeof profileSchema>

const profileState = reactive<Partial<ProfileSchema>>({
  firstName: authStore.user?.firstName ?? '',
  lastName: authStore.user?.lastName ?? '',
  phone: authStore.user?.phone ?? '',
  address: authStore.user?.address ?? '',
})

const profileLoading = ref(false)

async function onSaveProfile(event: FormSubmitEvent<ProfileSchema>) {
  profileLoading.value = true
  try {
    await new Promise((r) => setTimeout(r, 600))
    authStore.updateProfile(event.data)
    toast.add({ title: 'ذخیره شد', description: 'اطلاعات پروفایل به‌روزرسانی شد.', color: 'success', icon: 'i-lucide-check-circle' })
  } finally {
    profileLoading.value = false
  }
}

// — بخش تغییر رمز عبور
const passwordSchema = z.object({
  current: z.string().min(6, 'رمز عبور فعلی را وارد کنید'),
  newPass: z.string().min(6, 'حداقل ۶ کاراکتر'),
  confirm: z.string(),
}).refine((d) => d.newPass === d.confirm, { message: 'رمز عبور و تکرار یکسان نیستند', path: ['confirm'] })
type PasswordSchema = z.output<typeof passwordSchema>

const passwordState = reactive<Partial<PasswordSchema>>({ current: '', newPass: '', confirm: '' })
const passwordLoading = ref(false)

async function onChangePassword(event: FormSubmitEvent<PasswordSchema>) {
  passwordLoading.value = true
  try {
    await new Promise((r) => setTimeout(r, 700))
    toast.add({ title: 'رمز عبور تغییر کرد', color: 'success', icon: 'i-lucide-check-circle' })
    Object.assign(passwordState, { current: '', newPass: '', confirm: '' })
  } finally {
    passwordLoading.value = false
  }
}

function logout() {
  authStore.logout()
  cartStore.clearCart()
  navigateTo('/')
}

const initials = computed(() => {
  const u = authStore.user
  if (!u) return ''
  return (u.firstName[0] ?? '') + (u.lastName[0] ?? '')
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-10">
    <!-- Header کاربر -->
    <div
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      class="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-10"
    >
      <div class="size-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary shrink-0">
        {{ initials }}
      </div>
      <div class="flex-1 text-center sm:text-start">
        <h1 class="text-2xl font-bold text-default">
          {{ authStore.user?.firstName }} {{ authStore.user?.lastName }}
        </h1>
        <p class="text-muted mt-0.5">{{ authStore.user?.email }}</p>
      </div>
      <UButton color="error" variant="soft" icon="i-lucide-log-out" @click="logout">
        خروج
      </UButton>
    </div>

    <!-- Tabs -->
    <UTabs
      v-model="activeTab"
      :items="tabs"
      class="mb-8"
    >
      <template #default="{ item }">
        <div class="flex items-center gap-2">
          <UIcon :name="item.icon" class="size-4" />
          {{ item.label }}
        </div>
      </template>
    </UTabs>

    <!-- اطلاعات شخصی -->
    <div
      v-if="activeTab === 'info'"
      v-motion
      :initial="{ opacity: 0, y: 16 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }"
    >
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-user-pen" class="size-5 text-primary" />
            <span class="font-semibold">ویرایش اطلاعات</span>
          </div>
        </template>

        <UForm :schema="profileSchema" :state="profileState" class="space-y-5" @submit="onSaveProfile">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField name="firstName" label="نام">
              <UInput v-model="profileState.firstName" placeholder="نام" class="w-full" />
            </UFormField>
            <UFormField name="lastName" label="نام خانوادگی">
              <UInput v-model="profileState.lastName" placeholder="نام خانوادگی" class="w-full" />
            </UFormField>
          </div>
          <UFormField name="phone" label="شماره موبایل">
            <UInput v-model="profileState.phone" placeholder="09XXXXXXXXX" class="w-full" />
          </UFormField>
          <UFormField name="address" label="آدرس">
            <UInput v-model="profileState.address" placeholder="آدرس پستی" class="w-full" />
          </UFormField>

          <div class="flex justify-end pt-2">
            <UButton type="submit" :loading="profileLoading" icon="i-lucide-save">
              ذخیره تغییرات
            </UButton>
          </div>
        </UForm>
      </UCard>
    </div>

    <!-- سفارش‌ها -->
    <div
      v-else-if="activeTab === 'orders'"
      v-motion
      :initial="{ opacity: 0, y: 16 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }"
    >
      <!-- خالی -->
      <UCard v-if="orderStore.orders.length === 0">
        <div class="py-12 text-center flex flex-col items-center gap-3">
          <div class="size-16 rounded-full bg-elevated flex items-center justify-center">
            <UIcon name="i-lucide-shopping-bag" class="size-8 text-muted" />
          </div>
          <p class="font-medium text-default">هنوز سفارشی ندارید</p>
          <p class="text-sm text-muted">محصولات مورد علاقه‌تان را به سبد خرید اضافه کنید</p>
          <UButton variant="soft" to="/" icon="i-lucide-arrow-right" trailing class="mt-2">
            رفتن به فروشگاه
          </UButton>
        </div>
      </UCard>

      <!-- لیست سفارش‌ها -->
      <div v-else class="flex flex-col gap-4">
        <NuxtLink
          v-for="order in orderStore.orders"
          :key="order.id"
          :to="`/order/${order.id}`"
          class="block"
        >
          <UCard class="hover:shadow-md transition-shadow cursor-pointer">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2">
                  <span class="font-semibold text-default text-sm">{{ order.id }}</span>
                  <UBadge :color="orderStore.statusColor[order.status]" variant="subtle" size="xs">
                    {{ orderStore.statusLabel[order.status] }}
                  </UBadge>
                </div>
                <p class="text-xs text-muted">{{ formatDate(order.createdAt) }}</p>
              </div>

              <div class="flex items-center gap-4">
                <div class="flex -space-x-2 space-x-reverse">
                  <NuxtImg
                    v-for="item in order.items.slice(0, 3)"
                    :key="item.productId"
                    :src="item.productLogo"
                    :alt="item.productName"
                    class="size-9 rounded-lg object-cover ring-2 ring-elevated"
                  />
                  <div
                    v-if="order.items.length > 3"
                    class="size-9 rounded-lg bg-elevated ring-2 ring-elevated flex items-center justify-center text-xs font-bold text-muted"
                  >
                    +{{ order.items.length - 3 }}
                  </div>
                </div>
                <span class="font-bold text-default">{{ formatPrice(order.totalPrice) }} تومان</span>
                <UIcon name="i-lucide-chevron-left" class="size-4 text-muted" />
              </div>
            </div>
          </UCard>
        </NuxtLink>
      </div>
    </div>

    <!-- امنیت -->
    <div
      v-else-if="activeTab === 'security'"
      v-motion
      :initial="{ opacity: 0, y: 16 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }"
    >
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-key-round" class="size-5 text-primary" />
            <span class="font-semibold">تغییر رمز عبور</span>
          </div>
        </template>

        <UForm :schema="passwordSchema" :state="passwordState" class="space-y-4" @submit="onChangePassword">
          <UFormField name="current" label="رمز عبور فعلی">
            <UInput v-model="passwordState.current" type="password" placeholder="••••••••" class="w-full" />
          </UFormField>
          <UFormField name="newPass" label="رمز عبور جدید">
            <UInput v-model="passwordState.newPass" type="password" placeholder="••••••••" class="w-full" />
          </UFormField>
          <UFormField name="confirm" label="تکرار رمز عبور جدید">
            <UInput v-model="passwordState.confirm" type="password" placeholder="••••••••" class="w-full" />
          </UFormField>

          <div class="flex justify-end pt-2">
            <UButton type="submit" :loading="passwordLoading" icon="i-lucide-shield-check">
              تغییر رمز عبور
            </UButton>
          </div>
        </UForm>
      </UCard>
    </div>
  </div>
</template>
