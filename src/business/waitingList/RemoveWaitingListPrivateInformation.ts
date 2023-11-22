import { RemoveCustomerPrivateInformation } from '../customer/RemoveCustomerPrivateInformation'
import { WaitingListType } from '../../types/WaitingList.type'
import { RemoveProductPrivateInformation } from '../product/RemoveProductPrivateInformation'

export const RemoveWaitingListPrivateInformation = (waitingList: WaitingListType) => {
	return {
		...waitingList,
		customer: waitingList.customer
			? RemoveCustomerPrivateInformation(waitingList.customer)
			: null,
		product: waitingList.product ? RemoveProductPrivateInformation(waitingList.product) : null,
	}
}
