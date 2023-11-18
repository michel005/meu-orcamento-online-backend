import { CustomerType } from '../../types/Customer.type'

export const RemoveCustomerPrivateInformation = (customer: CustomerType) => {
	return {
		...customer,
		user_id: undefined,
	}
}
