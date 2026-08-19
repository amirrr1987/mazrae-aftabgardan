<script setup lang="ts">
const route = useRoute()
const { bySlug } = useProductLookup()
const cartStore = useCartStore()

const product = computed(() => {
  const slug = route.params.slug
  const key = Array.isArray(slug) ? slug[0] : slug
  if (!key) return null
  return bySlug(String(key))
})

const cartItem = computed(() =>
  product.value ? cartStore.cart.find((c) => c.productId === product.value!.id) : undefined
)

watchEffect(() => {
  useHead({ title: product.value ? `${product.value.name} — مزرعه آفتابگردان` : 'محصول پیدا نشد' })
  if (product.value) {
    useSeoMeta({
      description: product.value.description,
      ogDescription: product.value.description,
      ogImage: product.value.logo,
      ogTitle: product.value.name,
    })
  }
})

function formatPrice(price: number) {
  return price.toLocaleString('fa-IR') + ' تومان'
}

const categoryLabel = (id: number) =>
  ({ 1: 'قهوه و نوشیدنی', 2: 'شکلات', 3: 'آبنبات', 4: 'پاستیل' } as Record<number, string>)[id] ?? `دسته ${id}`

const categoryColor = (id: number): 'primary' | 'secondary' | 'success' | 'warning' =>
  ({ 1: 'primary', 2: 'secondary', 3: 'success', 4: 'warning' } as Record<number, 'primary' | 'secondary' | 'success' | 'warning'>)[id] ?? 'primary'
</script>

<template>
  <div v-if="product" class="max-w-5xl mx-auto px-4 py-8">
    <ProductDetailBackLink />

    <div class="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
      <!-- Image -->
      <div class="rounded-xl overflow-hidden">
        <ProductDetailMedia :src="product.logo" :alt="product.name" />
      </div>

      <!-- Info -->
      <div class="flex flex-col gap-5">
        <div class="flex flex-wrap items-start gap-2">
          <UBadge :color="categoryColor(product.categoryId)" variant="subtle">
            {{ categoryLabel(product.categoryId) }}
          </UBadge>
          <UBadge v-if="product.discountPrice" color="error" variant="subtle">
            تخفیف ویژه
          </UBadge>
        </div>

        <h1 class="text-3xl font-bold text-default">{{ product.name }}</h1>
        <p class="text-muted leading-relaxed">{{ product.description }}</p>

        <!-- Price -->
        <div class="flex items-center gap-3">
          <span v-if="product.discountPrice" class="text-2xl font-bold text-success">
            {{ formatPrice(product.discountPrice) }}
          </span>
          <span
            class="text-lg"
            :class="product.discountPrice ? 'line-through text-muted' : 'text-2xl font-bold text-default'"
          >
            {{ formatPrice(product.price) }}
          </span>
          <UBadge v-if="product.discountPrice" color="error" variant="solid" size="sm">
            {{ Math.round((1 - product.discountPrice / product.price) * 100) }}٪ تخفیف
          </UBadge>
        </div>

        <USeparator />

        <!-- Cart Actions -->
        <div v-if="cartItem" class="flex items-center gap-3">
          <UButton
            color="neutral"
            variant="outline"
            icon="i-lucide-minus"
            square
            @click="cartStore.decrementFromCart(product.id)"
          />
          <span class="text-xl font-bold w-8 text-center">{{ cartItem.quantity }}</span>
          <UButton
            icon="i-lucide-plus"
            square
            @click="cartStore.addToCart(product.id)"
          />
          <span class="text-sm text-muted me-2">عدد در سبد</span>
        </div>

        <UButton
          v-else
          size="lg"
          icon="i-lucide-shopping-cart"
          class="w-full"
          @click="cartStore.addToCart(product.id)"
        >
          افزودن به سبد خرید
        </UButton>
      </div>
    </div>

    <!-- نظرات -->
    <div class="mt-12">
      <div class="flex items-center gap-3 mb-6">
        <div class="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <UIcon name="i-lucide-message-square" class="size-5 text-primary" />
        </div>
        <h2 class="text-xl font-bold text-default">نظرات کاربران</h2>
      </div>
      <ProductReviews :product-id="product.id" />
    </div>
  </div>
  <ProductNotFound v-else />
</template>
