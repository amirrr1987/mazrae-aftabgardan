<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({ layout: 'auth' })
useHead({ title: 'ورود — مزرعه آفتابگردان' })

const authStore = useAuthStore()
const router = useRouter()

if (authStore.isLoggedIn) {
  await navigateTo('/profile')
}

const schema = z.object({
  email: z.email('ایمیل معتبر وارد کنید'),
  password: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
})

type Schema = z.output<typeof schema>

const loading = ref(false)
const error = ref('')

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  error.value = ''
  try {
    await new Promise((r) => setTimeout(r, 600))
    authStore.login(event.data.email, event.data.password)
    router.push('/profile')
  } catch {
    error.value = 'ایمیل یا رمز عبور اشتباه است'
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
            <h1 class="text-xl font-bold text-default">خوش برگشتید!</h1>
            <p class="text-sm text-muted mt-1">وارد حساب کاربری خود شوید</p>
          </div>
        </template>

        <UAlert
          v-if="error"
          color="error"
          variant="soft"
          :title="error"
          icon="i-lucide-alert-circle"
          class="mb-4"
        />

        <UAuthForm
          :schema="schema"
          :fields="[
            { name: 'email', type: 'email', label: 'ایمیل', placeholder: 'example@email.com', required: true },
            { name: 'password', type: 'password', label: 'رمز عبور', placeholder: '••••••••', required: true },
          ]"
          :submit="{ label: loading ? 'در حال ورود…' : 'ورود', block: true, loading }"
          @submit="onSubmit"
        >
          <template #password-hint>
            <NuxtLink to="/auth/forgot-password" class="text-xs text-primary hover:underline">
              فراموشی رمز عبور؟
            </NuxtLink>
          </template>

          <template #footer>
            <p class="text-center text-sm text-muted">
              حساب ندارید؟
              <NuxtLink to="/auth/register" class="text-primary font-medium hover:underline">ثبت‌نام کنید</NuxtLink>
            </p>
          </template>
        </UAuthForm>
      </UCard>
    </div>
  </div>
</template>
