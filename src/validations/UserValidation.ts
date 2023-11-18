import { UserType } from '../types/User.type'
import { newError } from '../utils/ErrorUtils'
import { Database } from '../middlewares/databases'

export const UserValidation = async ({ value, errors = {} }: { value: UserType; errors?: any }) => {
	if (!value?.id) {
		const findOneUserNameResult = await Database.user.findMany({
			user_name: value.user_name,
			NOT: {
				id: value.id,
			},
		})
		if (findOneUserNameResult.length > 0) {
			errors.user_name = newError('USER-003')
		}

		const findOneEmailResult = await Database.user.findMany({
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
