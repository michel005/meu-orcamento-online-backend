import { UserType } from '../types/UserType'
import { ErrorCollection } from '../utils/ErrorCollection'
import { AddressType } from '../types/AddressType'

export class AddressBusiness {
	static validate = (user: AddressType) => {
		const errors = new ErrorCollection()
		errors.addConditionally(
			!user.zip_code || user.zip_code.trim() === '',
			'zip_code',
			'VALIDATION-003'
		)
		errors.addConditionally(
			!user.street_name || user.street_name.trim() === '',
			'street_name',
			'VALIDATION-003'
		)
		errors.addConditionally(
			!user.street_number || user.street_number.trim() === '',
			'street_number',
			'VALIDATION-003'
		)
		errors.addConditionally(!user.city || user.city.trim() === '', 'city', 'VALIDATION-003')
		errors.addConditionally(!user.state || user.state.trim() === '', 'state', 'VALIDATION-003')
		errors.addConditionally(
			!user.country || user.country.trim() === '',
			'country',
			'VALIDATION-003'
		)

		errors.throw()
	}
}
