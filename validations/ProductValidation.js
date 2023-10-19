import { ProductSchema } from '../schema/ProductSchema.js'
import { newError } from '../utils/ErrorUtils.js'

export const ProductValidation = async ({ value, database }) => {
	ProductSchema.throwValidation(value)

	const errors = {}
	if (value?.code) {
		const codes = await database.findMany({
			code: value?.code,
			user_id: { $ne: value.user_id },
		})
		if (codes.length > 0) {
			errors.code = newError('PRODUCT-001')
		}
	}

	if (Object.keys(errors).length > 0) {
		throw errors
	}
}
