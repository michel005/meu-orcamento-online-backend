import { UserSchema } from '../schema/UserSchema.js'
import { newError } from '../utils/ErrorUtils.js'

export const UserValidation = ({ value, errors = {}, database, after }) => {
	UserSchema.throwValidation(value)
	if (!value?._id) {
		database.findMany(
			{
				user_name: value.user_name,
				id: { $ne: value?.id },
			},
			(findOneUserNameResult) => {
				if (findOneUserNameResult.length > 0) {
					errors.user_name = newError('DATABASE-001')
				}
				database.findMany(
					{
						email: value.email,
						_id: { $ne: value?._id },
					},
					(findOneEmailResult) => {
						if (findOneEmailResult.length > 0) {
							errors.email = newError('DATABASE-001')
						}
					}
				)
			}
		)
	}
}
