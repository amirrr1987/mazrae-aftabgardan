<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({ layout: 'auth' })
useHead({ title: 'فراموشی رمز عبور — مزرعه آفتابگردان' })

const schema = z.object({
  email: z.email('ایمیل معتبر وارد کنید'),
})
type Schema = z.output<typeof schema>

const loading = ref(false)
const sent = ref(false)
const sentEmail = ref('')

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await new Promise((r) => setTimeout(r, 800))
    sentEmail.value = event.data.email
    sent.value = true
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

      <!-- حالت ارسال موفق -->
      <UCard v-if="sent">
        <div class="text-center py-6 flex flex-col items-center gap-4">
          <div class="size-16 rounded-full bg-success/10 flex items-center justify-center">
            <UIcon name="i-lucide-mail-check" class="size-8 text-success" />
          </div>
          <div>
            <h2 class="font-bold text-default text-lg">ایمیل ارسال شد</h2>
            <p class="text-sm text-muted mt-2 leading-relaxed">
              لینک بازنشانی رمز عبور به
              <span class="font-medium text-default">{{ sentEmail }}</span>
              ارسال شد.
            </p>
          </div>
          <UButton variant="soft" color="neutral" to="/auth/login" block>
            بازگشت به ورود
          </UButton>
        </div>
      </UCard>

      <!-- فرم -->
      <UCard v-else>
        <template #header>
          <div class="text-center py-1">
            <h1 class="text-xl font-bold text-default">فراموشی رمز عبور</h1>
            <p class="text-sm text-muted mt-1">ایمیل خود را وارد کنید تا لینک بازنشانی برایتان ارسال شود</p>
          </div>
        </template>

        <UAuthForm
          :schema="schema"
          :fields="[
            { name: 'email', type: 'email', label: 'ایمیل', placeholder: 'example@email.com', required: true },
          ]"
          :submit="{ label: loading ? 'در حال ارسال…' : 'ارسال لینک بازنشانی', block: true, loading }"
          @submit="onSubmit"
        >
          <template #footer>
            <p class="text-center text-sm text-muted">
              <NuxtLink to="/auth/login" class="text-primary font-medium hover:underline flex items-center justify-center gap-1">
                <UIcon name="i-lucide-arrow-right" class="size-3.5" />
                بازگشت به ورود
              </NuxtLink>
            </p>
          </template>
        </UAuthForm>
      </UCard>
    </div>
  </div>
</template>
