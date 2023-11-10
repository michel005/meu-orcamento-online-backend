import { RemoveUserPrivateInformation } from './RemoveUserPrivateInformation.js'
import { UserSchema } from '../../schema/UserSchema.js'
import { AddressSchema } from '../../schema/AddressSchema.js'
import { SendFileByTypeAndIdentifier } from '../files/SendFileByTypeAndIdentifier.js'
import { RemoveFileByTypeAndIdentifier } from '../files/RemoveFileByTypeAndIdentifier.js'
import { GetUrlByTypeAndIdentifier } from '../files/GetUrlByTypeAndIdentifier.js'

export const ValidateAndUpdateUser = async (databases, currentUser, changed, token) => {
	const user = {
		...changed.user,
		picture: undefined,
		password: currentUser.password,
		email: currentUser.email,
		user_name: currentUser.user_name,
		address_id: undefined,
		id: currentUser.id,
	}
	const address = changed.address

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

	const newAddress = address.id
		? await databases.address.update(address.id, address)
		: await databases.address.create(address)
	const newUser = await databases.user.update(user.id, { ...user, address_id: newAddress.id })

	if (!changed.user.picture || !changed.user.picture.startsWith('http')) {
		if (changed.user.picture) {
			SendFileByTypeAndIdentifier('user', newUser.id, changed.user.picture)
		} else {
			RemoveFileByTypeAndIdentifier('user', newUser.id)
		}
	}

	return {
		user: RemoveUserPrivateInformation({
			...newUser,
			picture: GetUrlByTypeAndIdentifier('user', user.id, user.id),
		}),
		address: newAddress,
	}
}
