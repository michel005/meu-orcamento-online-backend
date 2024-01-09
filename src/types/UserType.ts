import { AddressType } from './AddressType'
import { ObjectId } from 'mongodb'
import { PictureType } from './PictureType'

export type UserType = {
	_id?: ObjectId
	picture?: PictureType
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
