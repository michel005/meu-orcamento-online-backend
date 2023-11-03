import { DateUtils } from '../../utils/DateUtils.js'
import { CustomerValidation } from '../../validations/CustomerValidation.js'
import { RemoveCustomerPrivateInformation } from './RemoveCustomerPrivateInformation.js'

export const ValidateAndCreateCustomer = async (database, customer, currentUser) => {
	const value = {
		...customer,
		address: customer.address || {},
		created: DateUtils.dateTimeToString(new Date()),
		updated: undefined,
		user_id: currentUser.id,
	}
	await CustomerValidation({
		value,
		database: database,
	})

	console.log(value)

	return RemoveCustomerPrivateInformation(await database.create(value))
}
