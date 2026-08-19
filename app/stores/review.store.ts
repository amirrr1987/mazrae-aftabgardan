import type { IReview } from '~/models/review.model'
import type { IProduct } from '~/models/product.model'

export const useReviewStore = defineStore('review', () => {
  const reviews = ref<IReview[]>([
    { id: 1, productId: 1, authorName: 'علی رضایی', rating: 5, comment: 'عالی! بهترین قهوه‌ای که تا حالا خوردم.', createdAt: new Date('2024-01-15') },
    { id: 2, productId: 1, authorName: 'مریم احمدی', rating: 4, comment: 'خوشمزه بود ولی بسته‌بندی کمی آسیب دیده بود.', createdAt: new Date('2024-02-01') },
    { id: 3, productId: 4, authorName: 'رضا موسوی', rating: 5, comment: 'شکلات تلخ درجه یک. حتماً دوباره می‌خرم.', createdAt: new Date('2024-02-10') },
  ])

  function forProduct(productId: IProduct['id']) {
    return reviews.value.filter((r) => r.productId === productId)
  }

  function averageRating(productId: IProduct['id']) {
    const list = forProduct(productId)
    if (!list.length) return 0
    return list.reduce((acc, r) => acc + r.rating, 0) / list.length
  }

  function addReview(payload: Omit<IReview, 'id' | 'createdAt'>) {
    reviews.value.unshift({
      ...payload,
      id: Date.now(),
      createdAt: new Date(),
    })
  }

  return { reviews, forProduct, averageRating, addReview }
})
