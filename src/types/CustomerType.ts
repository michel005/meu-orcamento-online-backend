import { ObjectId } from 'mongodb'
import { AddressType } from './AddressType'
import { UserType } from './UserType'

export type CustomerType = {
	_id?: ObjectId
	created?: string
	updated?: string
	active?: boolean
	favorite?: boolean
	full_name?: string
	person_type?: string
	document_type?: string
	document_number?: string
	email?: string
	birthday?: string
	phone?: string
	user_id?: ObjectId
	address?: AddressType
}
