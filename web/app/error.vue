<script setup lang="ts">
defineProps<{ error: { statusCode: number; message: string } }>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <UApp>
    <div class="min-h-dvh flex flex-col items-center justify-center p-8 text-center">
      <div class="size-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <UIcon
          :name="error.statusCode === 404 ? 'i-lucide-search-x' : 'i-lucide-circle-alert'"
          class="size-12 text-primary"
        />
      </div>

      <p class="text-7xl font-black text-primary mb-2">{{ error.statusCode }}</p>
      <h1 class="text-2xl font-bold text-default mb-2">
        {{ error.statusCode === 404 ? 'صفحه پیدا نشد' : 'خطایی رخ داد' }}
      </h1>
      <p class="text-muted max-w-sm mb-8">
        {{ error.statusCode === 404
          ? 'صفحه‌ای که دنبالش هستید وجود ندارد یا جابجا شده است.'
          : error.message }}
      </p>

      <div class="flex flex-wrap gap-3 justify-center">
        <UButton icon="i-lucide-house" @click="handleError">بازگشت به خانه</UButton>
        <UButton variant="soft" color="neutral" icon="i-lucide-arrow-right" @click="() => history.back()">
          صفحه قبل
        </UButton>
      </div>
    </div>
  </UApp>
</template>
