import type { IBase } from "./base.model"
import type { ICategory } from "./category.model"
import type { IBrand } from "./brand.model"

export interface IProduct extends IBase {
  name: string
  slug: string
  description: string

  logo: string
  images: string[]

  categoryId: ICategory['id']
  brandId: IBrand['id']

  isActive: boolean
  price: number
  discountPrice?: number
}