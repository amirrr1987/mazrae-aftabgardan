import type { IBase } from './base.model'

export interface IUser extends IBase {
  firstName: string
  lastName: string
  email: string
  phone?: string
  avatarUrl?: string
  address?: string
}
