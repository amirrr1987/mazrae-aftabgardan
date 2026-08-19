<script setup lang="ts">
import type { ICart } from '~/models/cart.model'

const cartStore = useCartStore()
const { byId } = useProductLookup()

const totalItems = computed(() =>
  cartStore.cart.reduce((acc: number, item: ICart) => acc + item.quantity, 0),
)

const totalPrice = computed(() => {
  return cartStore.cart.reduce((acc: number, item: ICart) => {
    const product = byId(item.productId)
    const price = product?.discountPrice ?? product?.price ?? 0
    return acc + price * item.quantity
  }, 0)
})

function formatPrice(price: number) {
  return price.toLocaleString('fa-IR') + ' تومان'
}
</script>

<template>
  <UPopover>
    <CartTriggerButton :total="totalItems" />

    <template #content>
      <CartEmptyState v-if="cartStore.cart.length === 0" />

      <div v-else class="flex flex-col gap-2 min-w-80 max-w-sm p-2">
        <div class="text-sm font-semibold text-default px-1">سبد خرید</div>

        <div class="flex flex-col gap-1.5 max-h-72 overflow-y-auto">
          <CartLineItem
            v-for="item in cartStore.cart"
            :key="item.productId"
            :product-id="item.productId"
            :name="byId(item.productId)?.name ?? `کالا #${item.productId}`"
            :logo="byId(item.productId)?.logo"
            :quantity="item.quantity"
            :price="byId(item.productId)?.price"
            :discount-price="byId(item.productId)?.discountPrice"
            @remove="cartStore.removeAllFromCart"
            @increment="cartStore.addToCart"
            @decrement="cartStore.decrementFromCart"
          />
        </div>

        <USeparator />

        <div class="flex items-center justify-between px-1 text-sm">
          <span class="text-muted">جمع کل:</span>
          <span class="font-bold text-default">{{ formatPrice(totalPrice) }}</span>
        </div>

        <CartCheckoutAction />
      </div>
    </template>
  </UPopover>
</template>
