import { UserType } from '../types/UserType'
import { ErrorCollection } from '../utils/ErrorCollection'
import { AddressBusiness } from './AddressBusiness'

export class UserBusiness {
	static validate = (user: UserType) => {
		const errors = new ErrorCollection()

		errors.addConditionally(
			!user.full_name || user.full_name.trim() === '',
			'full_name',
			'VALIDATION-003'
		)
		errors.addConditionally(!user.email || user.email.trim() === '', 'email', 'VALIDATION-003')
		errors.addConditionally(
			!user.password || user.password.trim() === '',
			'password',
			'VALIDATION-003'
		)
		errors.addConditionally(!user.phone || user.phone.trim() === '', 'phone', 'VALIDATION-003')
		errors.addConditionally(
			!user.user_name || user.user_name.trim() === '',
			'user_name',
			'VALIDATION-003'
		)
		try {
			if (user.address) {
				AddressBusiness.validate(user.address)
			}
		} catch (addressError) {
			errors.addCustom('address', addressError)
		}

		errors.throw()
	}

	static validateUpdate = (user: UserType) => {
		const errors = new ErrorCollection()

		errors.addConditionally(
			!user.full_name || user.full_name.trim() === '',
			'full_name',
			'VALIDATION-003'
		)
		errors.addConditionally(!user.email || user.email.trim() === '', 'email', 'VALIDATION-003')
		errors.addConditionally(!user.phone || user.phone.trim() === '', 'phone', 'VALIDATION-003')
		try {
			if (user.address) {
				AddressBusiness.validate(user.address)
			}
		} catch (addressError) {
			errors.addCustom('address', addressError)
		}

		errors.throw()
	}
}
