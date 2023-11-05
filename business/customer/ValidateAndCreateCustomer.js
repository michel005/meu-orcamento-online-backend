import { DateUtils } from '../../utils/DateUtils.js'
import { CustomerValidation } from '../../validations/CustomerValidation.js'
import { RemoveCustomerPrivateInformation } from './RemoveCustomerPrivateInformation.js'
import { AddressSchema } from '../../schema/AddressSchema.js'
import { CustomerSchema } from '../../schema/CustomerSchema.js'
import { SendFileByTypeAndIdentifier } from '../files/SendFileByTypeAndIdentifier.js'

export const ValidateAndCreateCustomer = async (databases, value, currentUser) => {
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

	const newAddress = await databases.address.create(address)
	const newCustomer = await databases.customer.create({
		...customer,
		user_id: currentUser.id,
		created: DateUtils.dateTimeToString(new Date()),
		address_id: newAddress.id,
	})

	if (value.customer.picture) {
		SendFileByTypeAndIdentifier(
			'customer',
			newCustomer.id,
			value.customer.picture,
			currentUser.id
		)
		newCustomer.picture = value.customer.picture
	}

	return {
		customer: RemoveCustomerPrivateInformation(newCustomer),
		address: newAddress,
	}
}
