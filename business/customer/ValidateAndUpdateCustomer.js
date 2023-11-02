import { DateUtils } from '../../utils/DateUtils.js'
import { CustomerValidation } from '../../validations/CustomerValidation.js'
import { RemoveCustomerPrivateInformation } from './RemoveCustomerPrivateInformation.js'

export const ValidateAndUpdateCustomer = async (database, id, customer) => {
	const findedCustomer = await database.findOne(id)
	const value = {
		...findedCustomer,
		...customer,
		address: customer.address || {},
		updated: DateUtils.dateTimeToString(new Date()),
		user_id: findedCustomer.user_id,
	}
	await CustomerValidation({
		value,
		database: database,
	})

	return RemoveCustomerPrivateInformation(await database.update(id, value))
}
