import { RemoveUserPrivateInformation } from './RemoveUserPrivateInformation'
import { UserSchema } from '../../schema/UserSchema'
import { AddressSchema } from '../../schema/AddressSchema'
import { SendFileByTypeAndIdentifier } from '../files/SendFileByTypeAndIdentifier'
import { RemoveFileByTypeAndIdentifier } from '../files/RemoveFileByTypeAndIdentifier'
import { GetUrlByTypeAndIdentifier } from '../files/GetUrlByTypeAndIdentifier'
import { DatabaseType } from '../../types/DatabaseType'
import { UserType } from '../../types/User.type'
import { AddressType } from '../../types/Address.type'
import { Database } from '../../middlewares/databases'

export const ValidateAndUpdateUser = async ({
	currentUser,
	changed,
}: {
	currentUser: UserType
	changed: {
		user: UserType
		address: AddressType
	}
}) => {
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

	let errors: any = {}

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
		? await Database.address.update(address.id, address)
		: await Database.address.create(address)
	const newUser = await Database.user.update(user.id as string, {
		...user,
		address_id: newAddress.id,
	})

	if (!changed.user.picture || !changed.user.picture.startsWith('http')) {
		if (changed.user.picture) {
			SendFileByTypeAndIdentifier('user', newUser.id as string, changed.user.picture)
		} else {
			RemoveFileByTypeAndIdentifier('user', newUser.id as string)
		}
	}

	return {
		user: RemoveUserPrivateInformation({
			...newUser,
			picture: GetUrlByTypeAndIdentifier('user', user.id as string, user.id as string),
		}),
		address: newAddress,
	}
}
