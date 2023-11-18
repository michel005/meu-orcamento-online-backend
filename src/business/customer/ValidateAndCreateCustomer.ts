import { DateUtils } from '../../utils/DateUtils'
import { RemoveCustomerPrivateInformation } from './RemoveCustomerPrivateInformation'
import { AddressSchema } from '../../schema/AddressSchema'
import { CustomerSchema } from '../../schema/CustomerSchema'
import { SendFileByTypeAndIdentifier } from '../files/SendFileByTypeAndIdentifier'
import { CustomerType } from '../../types/Customer.type'
import { AddressType } from '../../types/Address.type'
import { UserType } from '../../types/User.type'
import { DatabaseType } from '../../types/DatabaseType'
import { Database } from '../../middlewares/databases'

export const ValidateAndCreateCustomer = async (
	value: {
		customer: CustomerType
		address: AddressType
	},
	currentUser: UserType
) => {
	const customer = { ...value.customer, picture: undefined }
	const address = value.address

	let errors: any = {}

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

	const newAddress = await Database.address.create(address)
	const newCustomer = await Database.customer.create({
		...customer,
		user_id: currentUser.id,
		created: DateUtils.dateTimeToString(new Date()),
		address_id: newAddress.id,
	})

	if (value.customer.picture) {
		SendFileByTypeAndIdentifier(
			'customer',
			newCustomer.id as string,
			value.customer.picture,
			currentUser.id as string
		)
		newCustomer.picture = value.customer.picture
	}

	return {
		customer: RemoveCustomerPrivateInformation(newCustomer),
		address: newAddress,
	}
}
