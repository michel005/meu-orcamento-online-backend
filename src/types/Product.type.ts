import { CustomerType } from './Customer.type'
import { UserType } from './User.type'
import { WaitingListType } from './WaitingList.type'

export type ProductType = {
	id?: string
	user_id?: string | null
	seller_id?: string | null
	picture?: string | null
	code?: string | null
	created?: string
	updated?: string | null
	title?: string
	description?: string | null
	categories?: string | null
	price?: bigint | null
	status?: string
	user?: UserType
	customer?: CustomerType
	product_waiting_list?: WaitingListType[] | null
}
