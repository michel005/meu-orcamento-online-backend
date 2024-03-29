import { ObjectId } from 'mongodb'
import { AddressType } from './AddressType'
import { PictureType } from './PictureType'

export type CustomerType = {
	_id?: ObjectId
	picture?: PictureType
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
