import { RemoveCustomerPrivateInformation } from './RemoveCustomerPrivateInformation'
import { newError } from '../../utils/ErrorUtils'
import { CustomerSchema } from '../../schema/CustomerSchema'
import { AddressSchema } from '../../schema/AddressSchema'
import { SendFileByTypeAndIdentifier } from '../files/SendFileByTypeAndIdentifier'
import { RemoveFileByTypeAndIdentifier } from '../files/RemoveFileByTypeAndIdentifier'
import { DateUtils } from '../../utils/DateUtils'
import { CustomerType } from '../../types/Customer.type'
import { AddressType } from '../../types/Address.type'
import { UserType } from '../../types/User.type'
import { Database } from '../../middlewares/databases'

export const ValidateAndUpdateCustomer = async (
	value: {
		customer: CustomerType
		address: AddressType
	},
	currentUser: UserType
) => {
	const customerFound = await Database.customer.findOne(value.customer.id as string)
	if (!customerFound) {
		throw newError('DATABASE-002')
	}

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

	const customerUpdated = await Database.customer.update(customer.id as string, {
		...customer,
		updated: DateUtils.dateTimeToString(new Date()),
	})
	const addressUpdated = await Database.address.update(address.id as string, address)

	if (!(value?.customer?.picture || '').startsWith('http')) {
		if (value.customer.picture) {
			SendFileByTypeAndIdentifier(
				'customer',
				customerUpdated.id as string,
				value.customer.picture,
				currentUser.id as string
			)
			customerUpdated.picture = value.customer.picture
		} else {
			RemoveFileByTypeAndIdentifier(
				'customer',
				customer.id as string,
				currentUser.id as string
			)
			customerUpdated.picture = null
		}
	} else {
		customerUpdated.picture = value?.customer?.picture
	}

	return {
		customer: RemoveCustomerPrivateInformation(customerUpdated),
		address: addressUpdated,
	}
}
