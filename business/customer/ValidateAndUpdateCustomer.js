import { RemoveCustomerPrivateInformation } from './RemoveCustomerPrivateInformation.js'
import { newError } from '../../utils/ErrorUtils.js'
import { CustomerSchema } from '../../schema/CustomerSchema.js'
import { AddressSchema } from '../../schema/AddressSchema.js'
import { SendFileByTypeAndIdentifier } from '../files/SendFileByTypeAndIdentifier.js'
import { RemoveFileByTypeAndIdentifier } from '../files/RemoveFileByTypeAndIdentifier.js'

export const ValidateAndUpdateCustomer = async (databases, value, currentUser) => {
	const findedCustomer = await databases.customer.findOne(value.customer.id)
	if (!findedCustomer) {
		throw newError('DATABASE-002')
	}

	const customer = { ...value.customer, picture: undefined }
	const address = value.address

	let errors = {}

	const customerValidation = CustomerSchema.validate(customer)
	if (customerValidation.hasError) {
		errors.customer = customerValidation.errors
	}
	const addressValidation = AddressSchema.validate(address)
	if (addressValidation.hasError) {
		errors.address = addressValidation.errors
	}

	if (Object.keys(errors).length > 0) {
		throw errors
	}

	const customerUpdated = await databases.customer.update(customer.id, customer)
	const addressUpdated = await databases.address.update(address.id, address)

	if (value.customer.picture) {
		SendFileByTypeAndIdentifier(
			'customer',
			customerUpdated.id,
			value.customer.picture,
			currentUser.id
		)
		customerUpdated.picture = value.customer.picture
	} else {
		RemoveFileByTypeAndIdentifier('customer', customer.id, currentUser.id)
		customerUpdated.picture = null
	}

	return {
		customer: RemoveCustomerPrivateInformation(customerUpdated),
		address: addressUpdated,
	}
}
