import { CustomerType } from './Customer.type'

export type ProductType = {
	id?: string
	user_id?: string | null
	seller_id?: string | null
	code?: string | null
	created?: string
	updated?: string | null
	title?: string
	description?: string | null
	categories?: string | null
	price?: bigint | null
	status?: string
	customer: CustomerType
}
