import { UserType } from '../types/UserType'
import { AddressType } from '../types/AddressType'

export const AddressParser = (content: any): AddressType => {
	const user: AddressType = {}
	user.zip_code = content.zip_code || undefined
	user.street_number = content.street_number || undefined
	user.street_name = content.street_name || undefined
	user.complement = content.complement || undefined
	user.neighborhood = content.neighborhood || undefined
	user.city = content.city || undefined
	user.state = content.state || undefined
	user.country = content.country || undefined
	return user
}
