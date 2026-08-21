<script setup lang="ts">
useHead({ title: 'درباره ما — مزرعه آفتابگردان' })

const stats = [
  { value: '۸+', label: 'سال تجربه' },
  { value: '۵۰۰۰+', label: 'مشتری راضی' },
  { value: '۲۰+', label: 'محصول برتر' },
  { value: '۹۸٪', label: 'رضایت مشتری' },
]
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <div class="text-center mb-12">
      <div class="size-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <UIcon name="i-lucide-sun" class="size-10 text-primary" />
      </div>
      <h1 class="text-3xl font-black text-default mb-3">درباره مزرعه آفتابگردان</h1>
      <p class="text-muted leading-relaxed text-lg">داستان ما از یک عشق به طعم اصیل شروع شد</p>
    </div>

    <div class="space-y-8">
      <UCard>
        <div class="flex items-start gap-4">
          <div class="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-leaf" class="size-5 text-primary" />
          </div>
          <div>
            <h2 class="font-bold text-default mb-2 text-lg">داستان ما</h2>
            <p class="text-muted leading-relaxed">
              مزرعه آفتابگردان در سال ۱۳۹۵ با هدف ارائه بهترین قهوه، شکلات و تنقلات به علاقه‌مندان طعم اصیل تأسیس شد.
              ما باور داریم که هر لحظه لذت‌بخش نیاز به یک نوشیدنی یا خوراکی باکیفیت دارد.
            </p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-start gap-4">
          <div class="size-10 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-shield-check" class="size-5 text-success" />
          </div>
          <div>
            <h2 class="font-bold text-default mb-2 text-lg">کیفیت تضمینی</h2>
            <p class="text-muted leading-relaxed">
              تمام محصولات ما از منابع معتبر و تأییدشده تهیه می‌شوند. از مزرعه تا دست شما، هر مرحله با دقت و عشق انجام می‌شود.
            </p>
          </div>
        </div>
      </UCard>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <UCard v-for="stat in stats" :key="stat.label" class="text-center">
          <p class="text-3xl font-black text-primary">{{ stat.value }}</p>
          <p class="text-sm text-muted mt-1">{{ stat.label }}</p>
        </UCard>
      </div>
    </div>
  </div>
</template>
