import { ProductType } from '../../types/Product.type'
import { RemoveCustomerPrivateInformation } from '../customer/RemoveCustomerPrivateInformation'
import { GetUrlByTypeAndIdentifier } from '../files/GetUrlByTypeAndIdentifier'
import { Database } from '../../middlewares/databases'

export const RemoveProductPrivateInformation = async (product: ProductType) => {
	return {
		...product,
		user_id: undefined,
		user: undefined,
		picture: GetUrlByTypeAndIdentifier(
			'product',
			product.id as string,
			product.user_id as string
		),
		customer: product.customer ? RemoveCustomerPrivateInformation(product.customer) : null,
		product_waiting_list: (await Database.waitingList.findMany({ product_id: product.id })).map(
			(x) => {
				x.product = undefined
				x.customer = x.customer ? RemoveCustomerPrivateInformation(x.customer) : undefined
				return { ...x }
			}
		),
	}
}
