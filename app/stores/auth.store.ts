import type { IUser } from '~/models/user.model'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<IUser | null>(null)
  const isLoggedIn = computed(() => user.value !== null)

  function register(payload: { firstName: string; lastName: string; email: string; password: string }) {
    user.value = {
      id: Date.now(),
      createAt: new Date(),
      updateAt: new Date(),
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
    }
  }

  function login(email: string, _password: string) {
    user.value = {
      id: 1,
      createAt: new Date(),
      updateAt: new Date(),
      firstName: 'کاربر',
      lastName: 'آفتابگردان',
      email,
      phone: '09120000000',
      address: 'تهران، ایران',
    }
  }

  function logout() {
    user.value = null
  }

  function updateProfile(payload: Partial<Pick<IUser, 'firstName' | 'lastName' | 'phone' | 'address'>>) {
    if (user.value) {
      Object.assign(user.value, payload, { updateAt: new Date() })
    }
  }

  return { user, isLoggedIn, register, login, logout, updateProfile }
})
