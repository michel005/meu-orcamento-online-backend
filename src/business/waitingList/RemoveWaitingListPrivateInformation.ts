import { RemoveCustomerPrivateInformation } from '../customer/RemoveCustomerPrivateInformation'
import { WaitingListType } from '../../types/WaitingList.type'
import { Database } from '../../middlewares/databases'
import { CustomerType } from '../../types/Customer.type'

export const RemoveWaitingListPrivateInformation = async (waitingList: WaitingListType) => {
	const customer = await Database.customer.findOne(waitingList.customer_id as string)
	console.log({ waitingList })
	return {
		...waitingList,
		product_id: undefined,
		customer_id: undefined,
		product: undefined,
		customer: RemoveCustomerPrivateInformation(customer as CustomerType),
	}
}
