import { AddressType } from './Address.type'

export type UserType = {
	id?: string | null
	user_name?: string | null
	full_name?: string | null
	email?: string | null
	password?: string | null
	picture?: string | null
	phone?: string | null
	address_id?: string | null
	address?: AddressType | null
}
