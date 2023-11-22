import { CustomerType } from '../../types/Customer.type'
import { GetUrlByTypeAndIdentifier } from '../files/GetUrlByTypeAndIdentifier'

export const RemoveCustomerPrivateInformation = (customer: CustomerType) => {
	return {
		...customer,
		user_id: undefined,
		user: undefined,
		picture: GetUrlByTypeAndIdentifier(
			'customer',
			customer.id as string,
			customer.user_id as string
		),
	}
}
