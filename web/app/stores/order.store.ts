import type { IOrder, OrderStatus } from '~/models/order.model'

export const useOrderStore = defineStore('order', () => {
  const orders = ref<IOrder[]>([])

  function placeOrder(payload: Omit<IOrder, 'id' | 'createdAt' | 'status'>): IOrder {
    const order: IOrder = {
      ...payload,
      id: `ORD-${Date.now()}`,
      createdAt: new Date(),
      status: 'pending',
    }
    orders.value.unshift(order)
    return order
  }

  function getById(id: string): IOrder | undefined {
    return orders.value.find((o) => o.id === id)
  }

  const statusLabel: Record<OrderStatus, string> = {
    pending: 'در انتظار تأیید',
    processing: 'در حال پردازش',
    shipped: 'ارسال شده',
    delivered: 'تحویل داده شده',
    cancelled: 'لغو شده',
  }

  const statusColor: Record<OrderStatus, 'warning' | 'primary' | 'info' | 'success' | 'error'> = {
    pending: 'warning',
    processing: 'primary',
    shipped: 'info',
    delivered: 'success',
    cancelled: 'error',
  }

  return { orders, placeOrder, getById, statusLabel, statusColor }
})
