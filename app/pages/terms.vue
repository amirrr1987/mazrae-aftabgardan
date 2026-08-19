<script setup lang="ts">
useHead({ title: 'قوانین و مقررات — مزرعه آفتابگردان' })

const sections = [
  { icon: 'i-lucide-package', title: 'شرایط خرید', content: 'با ثبت سفارش، شما موافقت خود را با قوانین فروشگاه اعلام می‌کنید. پس از تأیید سفارش، امکان لغو در ۲ ساعت اول وجود دارد.' },
  { icon: 'i-lucide-rotate-ccw', title: 'شرایط مرجوعی', content: 'در صورت دریافت محصول معیوب یا ناقص، تا ۷ روز پس از دریافت می‌توانید درخواست مرجوعی ثبت کنید. محصولات غذایی باز‌شده قابل مرجوعی نیستند.' },
  { icon: 'i-lucide-truck', title: 'ارسال و تحویل', content: 'سفارش‌ها ظرف ۳ تا ۵ روز کاری ارسال می‌شوند. برای خریدهای بالای ۵۰۰،۰۰۰ تومان ارسال رایگان است. هزینه ارسال برای سفارش‌های کمتر ۳۵،۰۰۰ تومان می‌باشد.' },
  { icon: 'i-lucide-shield', title: 'حریم خصوصی', content: 'اطلاعات شخصی شما صرفاً جهت پردازش سفارش استفاده می‌شود و به هیچ شخص ثالثی منتقل نخواهد شد.' },
  { icon: 'i-lucide-credit-card', title: 'پرداخت', content: 'تمام تراکنش‌ها از طریق درگاه‌های معتبر بانکی انجام می‌شود. اطلاعات کارت بانکی شما ذخیره نمی‌شود.' },
]
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <div class="text-center mb-10">
      <h1 class="text-3xl font-black text-default mb-2">قوانین و مقررات</h1>
      <p class="text-muted">آخرین بروزرسانی: دی ماه ۱۴۰۳</p>
    </div>

    <div class="space-y-4">
      <UCard v-for="section in sections" :key="section.title">
        <div class="flex items-start gap-4">
          <div class="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <UIcon :name="section.icon" class="size-5 text-primary" />
          </div>
          <div>
            <h2 class="font-bold text-default mb-2">{{ section.title }}</h2>
            <p class="text-muted leading-relaxed text-sm">{{ section.content }}</p>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
