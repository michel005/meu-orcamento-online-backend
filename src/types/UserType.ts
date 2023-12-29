import { AddressType } from './AddressType'
import { ObjectId } from 'mongodb'

export type UserType = {
	_id?: ObjectId
	created?: string
	updated?: string
	full_name?: string
	user_name?: string
	email?: string
	birthday?: string
	phone?: string
	password?: string
	address?: AddressType
}
