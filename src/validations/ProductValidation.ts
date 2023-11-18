import { ProductSchema } from '../schema/ProductSchema'
import { newError } from '../utils/ErrorUtils'
import { UserType } from '../types/User.type'
import { ProductType } from '../types/Product.type'
import { Database } from '../middlewares/databases'

export const ProductValidation = async ({
	value,
	currentUser,
}: {
	value: ProductType
	currentUser: UserType
}) => {
	ProductSchema.throwValidation(value)

	const errors: any = {}
	if (value?.code) {
		const codes = await Database.product.findMany({
			code: value?.code,
			NOT: {
				user_id: currentUser.id,
			},
		})
		if (codes.length > 0) {
			errors.code = newError('PRODUCT-001')
		}
	}

	if (Object.keys(errors).length > 0) {
		throw errors
	}
}
