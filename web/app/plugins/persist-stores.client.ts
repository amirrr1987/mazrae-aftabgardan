import type { IUser } from '~/models/user.model'
import type { ICart } from '~/models/cart.model'
import type { IOrder } from '~/models/order.model'

function load<T>(key: string, fallback: T, reviver?: (v: T) => T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw) as T
    return reviver ? reviver(parsed) : parsed
  } catch {
    return fallback
  }
}

function save<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  const cartStore = useCartStore()
  const orderStore = useOrderStore()

  // بارگذاری از localStorage
  authStore.user = load<IUser | null>('auth:user', null)
  cartStore.cart = load<ICart[]>('cart:items', [])
  orderStore.orders = load<IOrder[]>('orders:list', [], (list) =>
    list.map((o) => ({ ...o, createdAt: new Date(o.createdAt) })),
  )

  // ذخیره خودکار هنگام تغییر
  watch(
    () => authStore.user,
    (val) => val ? save('auth:user', val) : localStorage.removeItem('auth:user'),
    { deep: true },
  )

  watch(
    () => cartStore.cart,
    (val) => val.length ? save('cart:items', val) : localStorage.removeItem('cart:items'),
    { deep: true },
  )

  watch(
    () => orderStore.orders,
    (val) => val.length ? save('orders:list', val) : localStorage.removeItem('orders:list'),
    { deep: true },
  )
})
