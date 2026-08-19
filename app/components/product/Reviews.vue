<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { IProduct } from '~/models/product.model'

const props = defineProps<{ productId: IProduct['id'] }>()

const reviewStore = useReviewStore()
const authStore = useAuthStore()
const toast = useToast()

const reviews = computed(() => reviewStore.forProduct(props.productId))
const avg = computed(() => reviewStore.averageRating(props.productId))

const schema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, 'نظر باید حداقل ۱۰ کاراکتر باشد'),
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({ rating: 5, comment: '' })
const loading = ref(false)
const showForm = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await new Promise((r) => setTimeout(r, 500))
    reviewStore.addReview({
      productId: props.productId,
      authorName: authStore.user
        ? `${authStore.user.firstName} ${authStore.user.lastName}`
        : 'کاربر مهمان',
      rating: event.data.rating,
      comment: event.data.comment,
    })
    toast.add({ title: 'نظر شما ثبت شد', color: 'success', icon: 'i-lucide-check-circle' })
    state.comment = ''
    state.rating = 5
    showForm.value = false
  } finally {
    loading.value = false
  }
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(d))
}
</script>

<template>
  <div class="space-y-6">
    <!-- خلاصه امتیاز -->
    <div class="flex items-center gap-4">
      <div class="text-center">
        <p class="text-4xl font-black text-default">{{ avg.toFixed(1) }}</p>
        <div class="flex gap-0.5 justify-center mt-1">
          <UIcon
            v-for="i in 5"
            :key="i"
            name="i-lucide-star"
            class="size-4"
            :class="i <= Math.round(avg) ? 'text-amber-400' : 'text-muted'"
          />
        </div>
        <p class="text-xs text-muted mt-1">{{ reviews.length }} نظر</p>
      </div>
      <USeparator orientation="vertical" class="h-16" />
      <div class="flex-1 space-y-1.5">
        <div v-for="star in [5,4,3,2,1]" :key="star" class="flex items-center gap-2">
          <span class="text-xs text-muted w-3">{{ star }}</span>
          <UIcon name="i-lucide-star" class="size-3 text-amber-400 shrink-0" />
          <div class="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              class="h-full bg-amber-400 rounded-full"
              :style="{ width: reviews.length ? `${(reviews.filter(r => r.rating === star).length / reviews.length) * 100}%` : '0%' }"
            />
          </div>
          <span class="text-xs text-muted w-4">{{ reviews.filter(r => r.rating === star).length }}</span>
        </div>
      </div>
    </div>

    <!-- دکمه ثبت نظر -->
    <UButton
      v-if="!showForm"
      variant="outline"
      color="neutral"
      icon="i-lucide-pen-line"
      @click="showForm = true"
    >
      ثبت نظر
    </UButton>

    <!-- فرم نظر -->
    <UCard v-if="showForm">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="font-semibold">نظر شما</span>
          <UButton variant="ghost" color="neutral" icon="i-lucide-x" square size="xs" @click="showForm = false" />
        </div>
      </template>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField name="rating" label="امتیاز">
          <div class="flex gap-1">
            <button
              v-for="i in 5"
              :key="i"
              type="button"
              class="cursor-pointer p-0.5"
              @click="state.rating = i"
            >
              <UIcon
                name="i-lucide-star"
                class="size-6 transition-colors"
                :class="i <= (state.rating ?? 0) ? 'text-amber-400' : 'text-muted hover:text-amber-300'"
              />
            </button>
          </div>
        </UFormField>

        <UFormField name="comment" label="متن نظر">
          <UInput v-model="state.comment" placeholder="تجربه خود را بنویسید..." class="w-full" />
        </UFormField>

        <div class="flex justify-end gap-2">
          <UButton variant="ghost" color="neutral" @click="showForm = false">انصراف</UButton>
          <UButton type="submit" :loading="loading" icon="i-lucide-send">ارسال نظر</UButton>
        </div>
      </UForm>
    </UCard>

    <!-- لیست نظرات -->
    <div v-if="reviews.length" class="space-y-3">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="p-4 rounded-2xl bg-elevated border border-default"
      >
        <div class="flex items-start justify-between gap-2 mb-2">
          <div class="flex items-center gap-2">
            <div class="size-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
              {{ review.authorName[0] }}
            </div>
            <span class="font-medium text-default text-sm">{{ review.authorName }}</span>
          </div>
          <div class="flex flex-col items-end gap-0.5">
            <div class="flex gap-0.5">
              <UIcon
                v-for="i in 5"
                :key="i"
                name="i-lucide-star"
                class="size-3.5"
                :class="i <= review.rating ? 'text-amber-400' : 'text-muted'"
              />
            </div>
            <span class="text-xs text-muted">{{ formatDate(review.createdAt) }}</span>
          </div>
        </div>
        <p class="text-sm text-muted leading-relaxed">{{ review.comment }}</p>
      </div>
    </div>

    <p v-else class="text-sm text-muted text-center py-6">هنوز نظری ثبت نشده. اولین نفر باشید!</p>
  </div>
</template>
