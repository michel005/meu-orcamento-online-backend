import { UserValidation } from '../../validations/UserValidation'
import { RemoveUserPrivateInformation } from './RemoveUserPrivateInformation'
import { UserSchema } from '../../schema/UserSchema'
import { AddressSchema } from '../../schema/AddressSchema'
import { SendFileByTypeAndIdentifier } from '../files/SendFileByTypeAndIdentifier'
import { UserType } from '../../types/User.type'
import { AddressType } from '../../types/Address.type'
import { Database } from '../../middlewares/databases'

export const ValidateAndCreateUser = async ({
	value,
}: {
	value: {
		user: UserType
		address: AddressType
	}
}) => {
	const user = {
		...value.user,
		picture: undefined,
	}
	const address = value.address

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
	await UserValidation({
		value: user,
	})

	const newAddress = await Database.address.create(address)
	const newUser = await Database.user.create({
		...user,
		address_id: newAddress.id,
	})

	if (value.user.picture) {
		SendFileByTypeAndIdentifier('user', newUser.id as string, value.user.picture)
	}

	return {
		user: RemoveUserPrivateInformation(newUser),
		address: newAddress,
	}
}
