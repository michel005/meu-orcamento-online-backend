import { UserSchema } from '../schema/UserSchema.js'
import { newError } from '../utils/ErrorUtils.js'

export const UserValidation = async ({ value, errors = {}, database }) => {
	UserSchema.throwValidation(value)
	if (!value?._id) {
		const findOneUserNameResult = await database.findMany({
			user_name: value.user_name,
			id: { $ne: value?.id },
		})
		if (findOneUserNameResult.length > 0) {
			errors.user_name = newError('DATABASE-001')
		}

		const findOneEmailResult = await database.findMany({
			email: value.email,
			_id: { $ne: value?._id },
		})
		if (findOneEmailResult.length > 0) {
			errors.email = newError('DATABASE-001')
		}

		if (Object.keys(errors).length > 0) {
			throw errors
		}
	}
}
