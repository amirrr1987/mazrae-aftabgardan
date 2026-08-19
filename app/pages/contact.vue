<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

useHead({ title: 'تماس با ما — مزرعه آفتابگردان' })

const schema = z.object({
  name: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  email: z.email('ایمیل معتبر وارد کنید'),
  subject: z.string().min(5, 'موضوع باید حداقل ۵ کاراکتر باشد'),
  message: z.string().min(20, 'پیام باید حداقل ۲۰ کاراکتر باشد'),
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({ name: '', email: '', subject: '', message: '' })
const loading = ref(false)
const sent = ref(false)
const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await new Promise((r) => setTimeout(r, 800))
    sent.value = true
    toast.add({ title: 'پیام ارسال شد', description: 'در اسرع وقت پاسخ می‌دهیم.', color: 'success', icon: 'i-lucide-check-circle' })
  } finally {
    loading.value = false
  }
}

const contactInfo = [
  { label: 'تلفن', value: '۰۲۱-۱۲۳۴۵۶۷۸', icon: 'i-lucide-phone' },
  { label: 'ایمیل', value: 'info@mazrae.ir', icon: 'i-lucide-mail' },
  { label: 'آدرس', value: 'تهران، خیابان ولیعصر', icon: 'i-lucide-map-pin' },
  { label: 'ساعت کاری', value: 'شنبه تا پنجشنبه ۹–۱۷', icon: 'i-lucide-clock' },
]
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <div class="text-center mb-10">
      <h1 class="text-3xl font-black text-default mb-2">تماس با ما</h1>
      <p class="text-muted">سؤال یا پیشنهادی دارید؟ خوشحال می‌شویم بشنویم.</p>
    </div>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <!-- اطلاعات تماس -->
      <div class="flex flex-col gap-4">
        <UCard v-for="info in contactInfo" :key="info.label">
          <div class="flex items-center gap-3">
            <div class="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <UIcon :name="info.icon" class="size-5 text-primary" />
            </div>
            <div>
              <p class="text-xs text-muted">{{ info.label }}</p>
              <p class="font-medium text-default text-sm">{{ info.value }}</p>
            </div>
          </div>
        </UCard>
      </div>

      <!-- فرم -->
      <div class="lg:col-span-2">
        <UCard v-if="sent">
          <div class="text-center py-10 flex flex-col items-center gap-4">
            <div class="size-16 rounded-full bg-success/10 flex items-center justify-center">
              <UIcon name="i-lucide-mail-check" class="size-8 text-success" />
            </div>
            <h2 class="font-bold text-default text-xl">پیام شما ارسال شد!</h2>
            <p class="text-muted">در اسرع وقت با شما تماس می‌گیریم.</p>
            <UButton variant="soft" color="neutral" @click="sent = false">ارسال پیام جدید</UButton>
          </div>
        </UCard>

        <UCard v-else>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-send" class="size-5 text-primary" />
              <span class="font-semibold">ارسال پیام</span>
            </div>
          </template>

          <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UFormField name="name" label="نام" required>
                <UInput v-model="state.name" placeholder="نام شما" class="w-full" />
              </UFormField>
              <UFormField name="email" label="ایمیل" required>
                <UInput v-model="state.email" type="email" placeholder="example@email.com" class="w-full" />
              </UFormField>
            </div>
            <UFormField name="subject" label="موضوع" required>
              <UInput v-model="state.subject" placeholder="موضوع پیام" class="w-full" />
            </UFormField>
            <UFormField name="message" label="پیام" required>
              <UInput v-model="state.message" placeholder="متن پیام خود را بنویسید..." class="w-full" />
            </UFormField>
            <div class="flex justify-end">
              <UButton type="submit" :loading="loading" icon="i-lucide-send">ارسال پیام</UButton>
            </div>
          </UForm>
        </UCard>
      </div>
    </div>
  </div>
</template>
