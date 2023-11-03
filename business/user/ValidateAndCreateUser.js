import { UserValidation } from '../../validations/UserValidation.js'
import { RemoveUserPrivateInformation } from './RemoveUserPrivateInformation.js'
import { UserSchema } from '../../schema/UserSchema.js'

export const ValidateAndCreateUser = async (database, user) => {
	await UserValidation({
		value: user,
		database: database,
	})

	const response = await database.create(user)
	return RemoveUserPrivateInformation(response)
}
