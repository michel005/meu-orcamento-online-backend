import { UserValidation } from '../../validations/UserValidation.js'
import { RemoveUserPrivateInformation } from './RemoveUserPrivateInformation.js'
import { UserSchema } from '../../schema/UserSchema.js'
import { AddressSchema } from '../../schema/AddressSchema.js'
import { SendFileByTypeAndIdentifier } from '../files/SendFileByTypeAndIdentifier.js'

export const ValidateAndCreateUser = async (databases, value) => {
	const user = {
		...value.user,
		picture: undefined,
	}
	const address = value.address

	let errors = {}

	const userValidation = UserSchema.validate(user)
	if (userValidation.hasError) {
		errors.user = userValidation.errors
	}
	const addressValidation = AddressSchema.validate(address)
	if (addressValidation.hasError) {
		errors.address = addressValidation.errors
	}

	if (Object.keys(errors).length > 0) {
		throw errors
	}
	await UserValidation({
		value: user,
		database: databases.user,
	})

	const newAddress = await databases.address.create(address)
	const newUser = await databases.user.create({
		...user,
		address_id: newAddress.id,
	})

	if (value.user.picture) {
		SendFileByTypeAndIdentifier('user', newUser.id, value.user.picture)
	}

	return {
		user: RemoveUserPrivateInformation(newUser),
		address: newAddress,
	}
}
