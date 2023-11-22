import { ProductType } from './Product.type'
import { CustomerType } from './Customer.type'

export type WaitingListType = {
	id?: string
	product_id?: string | null
	customer_id?: string | null
	created?: string | null
	product?: ProductType | null
	customer?: CustomerType | null
}
