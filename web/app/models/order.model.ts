import type { IProduct } from './product.model'

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface IOrderItem {
  productId: IProduct['id']
  productName: string
  productLogo: string
  quantity: number
  unitPrice: number
}

export interface IOrder {
  id: string
  createdAt: Date
  status: OrderStatus
  items: IOrderItem[]
  totalPrice: number
  receiver: {
    firstName: string
    lastName: string
    phone: string
    address: string
    city: string
    postalCode: string
  }
  note?: string
}
