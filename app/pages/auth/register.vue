<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({ layout: 'auth' })
useHead({ title: 'ثبت‌نام — مزرعه آفتابگردان' })

const authStore = useAuthStore()
const router = useRouter()

if (authStore.isLoggedIn) {
  await navigateTo('/profile')
}

const schema = z.object({
  firstName: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  lastName: z.string().min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد'),
  email: z.email('ایمیل معتبر وارد کنید'),
  password: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
  confirm: z.string(),
}).refine((d) => d.password === d.confirm, {
  message: 'رمز عبور و تکرار آن یکسان نیستند',
  path: ['confirm'],
})

type Schema = z.output<typeof schema>

const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await new Promise((r) => setTimeout(r, 700))
    authStore.register({
      firstName: event.data.firstName,
      lastName: event.data.lastName,
      email: event.data.email,
      password: event.data.password,
    })
    router.push('/profile')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-dvh items-center justify-center p-4">
    <div class="w-full max-w-sm">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex flex-col items-center gap-2">
          <div class="size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <UIcon name="i-lucide-sun" class="size-7 text-primary" />
          </div>
          <span class="font-bold text-lg text-default">مزرعه آفتابگردان</span>
        </NuxtLink>
      </div>

      <UCard>
        <template #header>
          <div class="text-center py-1">
            <h1 class="text-xl font-bold text-default">ثبت‌نام</h1>
            <p class="text-sm text-muted mt-1">یک حساب کاربری جدید بسازید</p>
          </div>
        </template>

        <UAuthForm
          :schema="schema"
          :fields="[
            { name: 'firstName', type: 'text', label: 'نام', placeholder: 'علی', required: true },
            { name: 'lastName', type: 'text', label: 'نام خانوادگی', placeholder: 'محمدی', required: true },
            { name: 'email', type: 'email', label: 'ایمیل', placeholder: 'example@email.com', required: true },
            { name: 'password', type: 'password', label: 'رمز عبور', placeholder: '••••••••', required: true },
            { name: 'confirm', type: 'password', label: 'تکرار رمز عبور', placeholder: '••••••••', required: true },
          ]"
          :submit="{ label: loading ? 'در حال ثبت‌نام…' : 'ثبت‌نام', block: true, loading }"
          @submit="onSubmit"
        >
          <template #footer>
            <p class="text-center text-sm text-muted">
              حساب دارید؟
              <NuxtLink to="/auth/login" class="text-primary font-medium hover:underline">وارد شوید</NuxtLink>
            </p>
          </template>
        </UAuthForm>
      </UCard>
    </div>
  </div>
</template>
