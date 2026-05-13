<script setup lang="ts">
import { useToast } from '@nuxt/ui/runtime/composables/useToast.js'
import type { ICart } from '~/models/cart.model'

const cartStore = useCartStore()
const { byId } = useProductLookup()

const totalItems = computed(() =>
  cartStore.cart.reduce((acc: number, item: ICart) => acc + item.quantity, 0),
)

const toast = useToast()

function onCheckout() {
  toast.add({
    title: 'تکمیل خرید',
    description: 'اتصال به درگاه پرداخت به‌زودی فعال می‌شود.',
    color: 'primary',
  })
}
</script>

<template>
  <UPopover>
    <CartTriggerButton :total="totalItems" />

    <template #content>
      <CartEmptyState v-if="cartStore.cart.length === 0" />

      <div v-else class="flex max-h-80 min-w-96 flex-col gap-2 overflow-y-auto p-1">
        <CartLineItem v-for="item in cartStore.cart" :key="item.productId" :product-id="item.productId"
          :name="byId(item.productId)?.name ?? `کالا #${item.productId}`" :logo="byId(item.productId)?.logo"
          :quantity="item.quantity" @remove="cartStore.removeFromCart" />
        <CartCheckoutAction @checkout="onCheckout" />
      </div>
    </template>
  </UPopover>
</template>
