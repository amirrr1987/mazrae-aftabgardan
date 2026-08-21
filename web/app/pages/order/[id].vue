<script setup lang="ts">
useHead({ title: 'تأیید سفارش — مزرعه آفتابگردان' })

const route = useRoute()
const orderStore = useOrderStore()

const order = computed(() => orderStore.getById(route.params.id as string))

if (!order.value) {
  await navigateTo('/')
}

function formatPrice(p: number) {
  return p.toLocaleString('fa-IR')
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(new Date(d))
}
</script>

<template>
  <div v-if="order" class="max-w-2xl mx-auto px-4 py-14">

    <!-- آیکون موفقیت -->
    <div class="text-center mb-10">
      <div class="size-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-5">
        <UIcon name="i-lucide-check-circle-2" class="size-10 text-success" />
      </div>
      <h1 class="text-2xl font-black text-default">سفارش شما ثبت شد!</h1>
      <p class="text-muted mt-2">با موفقیت ثبت شد و به زودی پردازش می‌شود.</p>
    </div>

    <!-- کارت سفارش -->
    <UCard class="mb-6">
      <template #header>
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-package" class="size-5 text-primary" />
            <span class="font-semibold text-default">{{ order.id }}</span>
          </div>
          <UBadge :color="orderStore.statusColor[order.status]" variant="subtle">
            {{ orderStore.statusLabel[order.status] }}
          </UBadge>
        </div>
      </template>

      <div class="space-y-4">
        <p class="text-sm text-muted">{{ formatDate(order.createdAt) }}</p>

        <!-- آیتم‌ها -->
        <div class="flex flex-col gap-3">
          <div
            v-for="item in order.items"
            :key="item.productId"
            class="flex items-center gap-3 p-3 rounded-xl bg-elevated"
          >
            <NuxtImg
              :src="item.productLogo"
              :alt="item.productName"
              class="size-14 rounded-lg object-cover shrink-0"
            />
            <div class="flex-1 min-w-0">
              <p class="font-medium text-default truncate">{{ item.productName }}</p>
              <p class="text-sm text-muted">{{ item.quantity }} عدد</p>
            </div>
            <span class="font-bold text-default shrink-0">
              {{ formatPrice(item.unitPrice * item.quantity) }} تومان
            </span>
          </div>
        </div>

        <USeparator />

        <!-- مبلغ نهایی -->
        <div class="flex justify-between items-center">
          <span class="text-muted">مبلغ نهایی</span>
          <span class="text-xl font-black text-primary">{{ formatPrice(order.totalPrice) }} تومان</span>
        </div>
      </div>
    </UCard>

    <!-- اطلاعات تحویل -->
    <UCard class="mb-8">
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-map-pin" class="size-5 text-primary" />
          <span class="font-semibold">اطلاعات تحویل</span>
        </div>
      </template>

      <dl class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div>
          <dt class="text-muted">گیرنده</dt>
          <dd class="font-medium text-default mt-0.5">{{ order.receiver.firstName }} {{ order.receiver.lastName }}</dd>
        </div>
        <div>
          <dt class="text-muted">موبایل</dt>
          <dd class="font-medium text-default mt-0.5">{{ order.receiver.phone }}</dd>
        </div>
        <div class="sm:col-span-2">
          <dt class="text-muted">آدرس</dt>
          <dd class="font-medium text-default mt-0.5">{{ order.receiver.city }} — {{ order.receiver.address }}</dd>
        </div>
        <div v-if="order.note" class="sm:col-span-2">
          <dt class="text-muted">توضیحات</dt>
          <dd class="font-medium text-default mt-0.5">{{ order.note }}</dd>
        </div>
      </dl>
    </UCard>

    <!-- دکمه‌ها -->
    <div class="flex flex-col sm:flex-row gap-3">
      <UButton to="/" variant="soft" color="neutral" icon="i-lucide-shopping-bag" class="flex-1">
        ادامه خرید
      </UButton>
      <UButton to="/profile" icon="i-lucide-package" class="flex-1">
        مشاهده سفارش‌ها
      </UButton>
    </div>
  </div>
</template>
