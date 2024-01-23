import { ObjectId } from 'mongodb'
import { CustomerType } from './CustomerType'
import { UserType } from './UserType'
import { PictureType } from './PictureType'
import { ProductType } from './ProductType'

export type SellType = {
	_id?: ObjectId
	created?: string
	updated?: string
	user_id?: ObjectId
	customer_id?: ObjectId
	customer?: CustomerType
	items?: {
		product_id: ObjectId
		product: ProductType
		percentage: number
	}[]
	finalPrice?: number
	status?: 'PENDING' | 'CANCELED' | 'PAYED'
}
