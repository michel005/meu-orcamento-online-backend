import { UserType } from './User.type'
import { AddressType } from './Address.type'

export type CustomerType = {
	id?: string
	user_id?: string | null
	address_id?: string | null
	created?: string
	updated?: string | null
	picture?: string | null
	birthday?: string | null
	full_name?: string | null
	phone?: string | null
	person_type?: string | null
	document_type?: string | null
	document_number?: string | null
	email?: string | null
	active?: number | null
	favorite?: number | null
	user?: UserType
	address?: AddressType
}
