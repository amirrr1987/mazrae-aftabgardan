import type { IBase } from "./base.model"

export interface ICategory extends IBase {
  name: string
  slug: string
  description: string
  isActive: boolean

}