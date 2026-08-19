<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { ICart } from '~/models/cart.model'

useHead({ title: 'تکمیل سفارش — مزرعه آفتابگردان' })

const cartStore = useCartStore()
const authStore = useAuthStore()
const orderStore = useOrderStore()
const { byId } = useProductLookup()
const router = useRouter()

// اگر سبد خالی بود برگرد
if (!cartStore.cart.length) {
  await navigateTo('/')
}

const schema = z.object({
  firstName: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  lastName: z.string().min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد'),
  phone: z.string().regex(/^09\d{9}$/, 'شماره موبایل معتبر وارد کنید'),
  city: z.string().min(2, 'نام شهر را وارد کنید'),
  address: z.string().min(10, 'آدرس باید حداقل ۱۰ کاراکتر باشد'),
  postalCode: z.string().regex(/^\d{10}$/, 'کد پستی باید ۱۰ رقم باشد'),
  note: z.string().optional(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  firstName: authStore.user?.firstName ?? '',
  lastName: authStore.user?.lastName ?? '',
  phone: authStore.user?.phone ?? '',
  city: '',
  address: authStore.user?.address ?? '',
  postalCode: '',
  note: '',
})

const loading = ref(false)

const cartItems = computed(() =>
  cartStore.cart.map((item: ICart) => ({
    ...item,
    product: byId(item.productId),
  })).filter((i) => i.product),
)

const totalPrice = computed(() =>
  cartItems.value.reduce((acc, item) => {
    const price = item.product!.discountPrice ?? item.product!.price
    return acc + price * item.quantity
  }, 0),
)

const shippingFee = computed(() => (totalPrice.value >= 500000 ? 0 : 35000))
const grandTotal = computed(() => totalPrice.value + shippingFee.value)

function formatPrice(p: number) {
  return p.toLocaleString('fa-IR')
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await new Promise((r) => setTimeout(r, 900))

    const order = orderStore.placeOrder({
      receiver: {
        firstName: event.data.firstName,
        lastName: event.data.lastName,
        phone: event.data.phone,
        city: event.data.city,
        address: event.data.address,
        postalCode: event.data.postalCode,
      },
      note: event.data.note,
      items: cartItems.value.map((i) => ({
        productId: i.productId,
        productName: i.product!.name,
        productLogo: i.product!.logo,
        quantity: i.quantity,
        unitPrice: i.product!.discountPrice ?? i.product!.price,
      })),
      totalPrice: grandTotal.value,
    })

    cartStore.cart.splice(0)
    router.push(`/order/${order.id}`)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-10">
    <!-- عنوان -->
    <div class="flex items-center gap-3 mb-8">
      <UButton to="/" variant="ghost" color="neutral" icon="i-lucide-arrow-right" square />
      <h1 class="text-2xl font-bold text-default">تکمیل سفارش</h1>
    </div>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">

      <!-- فرم -->
      <div class="lg:col-span-2">
        <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">

          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-map-pin" class="size-5 text-primary" />
                <span class="font-semibold">اطلاعات تحویل</span>
              </div>
            </template>

            <div class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UFormField name="firstName" label="نام" required>
                  <UInput v-model="state.firstName" placeholder="علی" class="w-full" />
                </UFormField>
                <UFormField name="lastName" label="نام خانوادگی" required>
                  <UInput v-model="state.lastName" placeholder="محمدی" class="w-full" />
                </UFormField>
              </div>

              <UFormField name="phone" label="شماره موبایل" required>
                <UInput v-model="state.phone" placeholder="09120000000" class="w-full" />
              </UFormField>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UFormField name="city" label="شهر" required>
                  <UInput v-model="state.city" placeholder="تهران" class="w-full" />
                </UFormField>
                <UFormField name="postalCode" label="کد پستی" required>
                  <UInput v-model="state.postalCode" placeholder="1234567890" class="w-full" />
                </UFormField>
              </div>

              <UFormField name="address" label="آدرس دقیق" required>
                <UInput v-model="state.address" placeholder="خیابان، کوچه، پلاک، واحد..." class="w-full" />
              </UFormField>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-message-square" class="size-5 text-primary" />
                <span class="font-semibold">توضیحات سفارش (اختیاری)</span>
              </div>
            </template>
            <UFormField name="note">
              <UInput v-model="state.note" placeholder="هر توضیحی برای فروشنده..." class="w-full" />
            </UFormField>
          </UCard>

          <!-- دکمه ارسال -->
          <UButton
            type="submit"
            size="xl"
            block
            :loading="loading"
            icon="i-lucide-check-circle"
          >
            {{ loading ? 'در حال ثبت سفارش…' : 'ثبت سفارش' }}
          </UButton>
        </UForm>
      </div>

      <!-- خلاصه سبد -->
      <div class="flex flex-col gap-4">
        <UCard class="sticky top-24">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-shopping-bag" class="size-5 text-primary" />
              <span class="font-semibold">خلاصه سفارش</span>
            </div>
          </template>

          <div class="flex flex-col gap-3">
            <!-- آیتم‌ها -->
            <div
              v-for="item in cartItems"
              :key="item.productId"
              class="flex items-center gap-3"
            >
              <NuxtImg
                :src="item.product!.logo"
                :alt="item.product!.name"
                class="size-12 rounded-lg object-cover shrink-0"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-default truncate">{{ item.product!.name }}</p>
                <p class="text-xs text-muted">{{ item.quantity }} عدد</p>
              </div>
              <span class="text-sm font-semibold text-default shrink-0">
                {{ formatPrice((item.product!.discountPrice ?? item.product!.price) * item.quantity) }}
              </span>
            </div>

            <USeparator />

            <!-- محاسبات -->
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-muted">جمع محصولات</span>
                <span>{{ formatPrice(totalPrice) }} تومان</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted">هزینه ارسال</span>
                <span v-if="shippingFee === 0" class="text-success font-medium">رایگان</span>
                <span v-else>{{ formatPrice(shippingFee) }} تومان</span>
              </div>
              <p v-if="shippingFee > 0" class="text-xs text-muted">
                خرید بالای ۵۰۰،۰۰۰ تومان ارسال رایگان دارد
              </p>
            </div>

            <USeparator />

            <div class="flex justify-between items-center">
              <span class="font-bold text-default">مبلغ نهایی</span>
              <span class="text-lg font-black text-primary">{{ formatPrice(grandTotal) }} تومان</span>
            </div>
          </div>
        </UCard>
      </div>

    </div>
  </div>
</template>
