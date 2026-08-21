import type { IBase } from "./base.model"

export interface IBrand extends IBase {
  name: string
  slug: string
  description: string

  isActive: boolean
}