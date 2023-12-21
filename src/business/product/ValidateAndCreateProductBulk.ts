import { DateUtils } from '../../utils/DateUtils'
import { ProductValidation } from '../../validations/ProductValidation'
import { ProductType } from '../../types/Product.type'
import { UserType } from '../../types/User.type'
import { Database } from '../../middlewares/databases'
import { ProductSchema } from '../../schema/ProductSchema'

export const ValidateAndCreateProductBulk = async ({
	data,
	currentUser,
}: {
	data: {
		seller_id: string
		products: ProductType[]
	}
	currentUser: UserType
}) => {
	let errors: any = []
	for (let productIndex = 0; productIndex < data.products.length; productIndex++) {
		const product = data.products[productIndex]
		const value: ProductType = {
			...product,
			product_waiting_list: undefined,
			seller_id: data.seller_id,
			picture: undefined,
			user_id: currentUser.id,
			status: 'AVAILABLE',
			created: DateUtils.dateTimeToString(new Date()),
		}

		let productError: any = {}
		const productValidation = ProductSchema.validate(value)
		if (productValidation.hasError) {
			productError = productValidation.errors
		}
		const productDatabaseValidation = await ProductValidation({
			value,
		})
		if (Object.keys(productDatabaseValidation).length > 0) {
			productError = {
				...productError,
				productDatabaseValidation,
			}
		}
		if (Object.keys(productError).length > 0) {
			errors.push([productIndex, productError])
		}
	}

	if (errors.length > 0) {
		throw errors
	}

	const cache = []
	for (const product of data.products) {
		const value: ProductType = {
			...product,
			product_waiting_list: undefined,
			seller_id: data.seller_id,
			picture: undefined,
			user_id: currentUser.id,
			status: 'AVAILABLE',
			created: DateUtils.dateTimeToString(new Date()),
		}
		cache.push(Database.product.create(value))

		if (cache.length === 4) {
			await Promise.all(cache)
			cache.splice(0, 4)
		}
	}

	if (cache.length > 0) {
		await Promise.all(cache)
	}
}
