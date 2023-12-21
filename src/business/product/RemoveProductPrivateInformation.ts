import { ProductType } from '../../types/Product.type'
import { RemoveCustomerPrivateInformation } from '../customer/RemoveCustomerPrivateInformation'
import { GetUrlByTypeAndIdentifier } from '../files/GetUrlByTypeAndIdentifier'
import { Database } from '../../middlewares/databases'
import { CustomerType } from '../../types/Customer.type'

export const RemoveProductPrivateInformation = async (product: ProductType) => {
	const allWaitingListItems = await Database.waitingList.findMany({ product_id: product.id })
	for (const item of allWaitingListItems) {
		item.customer = RemoveCustomerPrivateInformation(
			(await Database.customer.findOne(item.customer_id as string)) as CustomerType
		)
		item.customer_id = undefined
		item.product_id = undefined
	}
	return {
		...product,
		user_id: undefined,
		user: undefined,
		picture: GetUrlByTypeAndIdentifier(
			'product',
			product.id as string,
			product.user_id as string
		),
		customer: product.customer
			? await RemoveCustomerPrivateInformation(product.customer)
			: null,
		product_waiting_list: allWaitingListItems,
	}
}
