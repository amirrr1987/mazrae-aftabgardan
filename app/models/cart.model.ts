import type { IBase } from "./base.model"
import type { IProduct } from "./product.model"

export interface ICart {
  productId: IProduct['id']
  quantity: number
}