import { ProductSchema } from '../schema/ProductSchema'
import { newError } from '../utils/ErrorUtils'
import { UserType } from '../types/User.type'
import { ProductType } from '../types/Product.type'
import { Database } from '../middlewares/databases'

export const ProductValidation = async ({ value }: { value: ProductType }) => {
	const errors: any = {}
	if (value?.code) {
		const codes = await Database.product.findMany({
			code: value?.code,
			NOT: {
				id: value.id,
			},
		})
		if (codes.length > 0) {
			errors.code = newError('PRODUCT-001')
		}
	}

	if (value.seller_id) {
		const customerFound = await Database.customer.findOne(value.seller_id)
		if (!customerFound) {
			errors.customer_id = newError('DATABASE-002')
		}
	}

	return errors
}
