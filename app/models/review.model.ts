import type { IProduct } from './product.model'

export interface IReview {
  id: number
  productId: IProduct['id']
  authorName: string
  rating: number
  comment: string
  createdAt: Date
}
