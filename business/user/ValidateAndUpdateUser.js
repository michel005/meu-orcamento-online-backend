import { UserValidation } from '../../validations/UserValidation.js'
import { useMongoDatabase } from '../../hooks/useMongoDatabase.js'
import { RemoveUserPrivateInformation } from './RemoveUserPrivateInformation.js'

export const ValidateAndUpdateUser = async (database, currentUser, changedUser) => {
	await UserValidation({
		value: {
			...currentUser,
			...changedUser,
		},
		database: database,
	})
	const updatedUser = await database.update(currentUser._id, {
		...currentUser,
		...changedUser,
		email: currentUser.email,
		user_name: currentUser.user_name,
	})
	return RemoveUserPrivateInformation(updatedUser)
}
