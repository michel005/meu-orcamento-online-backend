import { UserSchema } from '../schema/UserSchema.js'
import { newError } from '../utils/ErrorUtils.js'

export const UserValidation = async ({ value, errors = {}, database }) => {
	if (!value?.id) {
		const findOneUserNameResult = await database.findMany({
			user_name: value.user_name,
			NOT: {
				id: value.id,
			},
		})
		if (findOneUserNameResult.length > 0) {
			errors.user_name = newError('USER-003')
		}

		const findOneEmailResult = await database.findMany({
			email: value.email,
			NOT: {
				id: value.id,
			},
		})
		if (findOneEmailResult.length > 0) {
			errors.email = newError('USER-002')
		}

		if (Object.keys(errors).length > 0) {
			throw {
				user: errors,
			}
		}
	}
}
