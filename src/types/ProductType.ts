import { ObjectId } from 'mongodb'
import { CustomerType } from './CustomerType'
import { UserType } from './UserType'

export type ProductType = {
	_id?: ObjectId
	user_id?: ObjectId
	user?: UserType
	seller_id?: ObjectId
	seller?: CustomerType
	created?: string
	updated?: string
	code?: string
	title?: string
	description?: string
	categories?: string
	price?: number
	status?: string
}
