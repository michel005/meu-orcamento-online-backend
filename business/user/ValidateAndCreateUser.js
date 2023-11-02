import { UserValidation } from '../../validations/UserValidation.js'
import { RemoveUserPrivateInformation } from './RemoveUserPrivateInformation.js'

export const ValidateAndCreateUser = async (database, user) => {
	await UserValidation({
		value: user,
		database: database,
	})
	const response = await database.create(user)
	return RemoveUserPrivateInformation(response)
}
