import { ErrorCollection } from '../utils/ErrorCollection'
import { AddressType } from '../types/AddressType'

export class AddressBusiness {
	static validate = (user: AddressType) => {
		const errors = new ErrorCollection()
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
