import { DateUtils } from '../../utils/DateUtils'
import { ProductValidation } from '../../validations/ProductValidation'
import { ProductType } from '../../types/Product.type'
import { UserType } from '../../types/User.type'
import { Database } from '../../middlewares/databases'
import { SendFileByTypeAndIdentifier } from '../files/SendFileByTypeAndIdentifier'
import { RemoveFileByTypeAndIdentifier } from '../files/RemoveFileByTypeAndIdentifier'
import { newError } from '../../utils/ErrorUtils'
import { RemoveProductPrivateInformation } from './RemoveProductPrivateInformation'
import { ProductSchema } from '../../schema/ProductSchema'

export const ValidateAndUpdateProduct = async ({
	data,
	currentUser,
}: {
	data: {
		product: ProductType
	}
	currentUser: UserType
}) => {
	const productFound = await Database.product.findOne(data.product.id as string)
	if (!productFound) {
		throw newError('DATABASE-002')
	}

	const value: ProductType = {
		...data.product,
		customer: undefined,
		picture: undefined,
		user_id: undefined,
		created: undefined,
		product_waiting_list: undefined,
		updated: DateUtils.dateTimeToString(new Date()),
	}

	let errors: any = {}
	const productValidation = ProductSchema.validate(value)
	if (productValidation.hasError) {
		errors.product = productValidation.errors
	}
	const productDatabaseValidation = await ProductValidation({
		value,
	})
	if (Object.keys(productDatabaseValidation).length > 0) {
		errors.product = {
			...errors.product,
			...productDatabaseValidation,
		}
	}
	if (Object.keys(errors).length > 0) {
		throw errors
	}

	const updatedProduct = await Database.product.update(value.id as string, value)

	if (!(data.product?.picture || '').startsWith('http')) {
		if (data.product.picture) {
			SendFileByTypeAndIdentifier(
				'product',
				updatedProduct.id as string,
				data.product.picture,
				currentUser.id as string
			)
			updatedProduct.picture = data.product.picture
		} else {
			RemoveFileByTypeAndIdentifier(
				'product',
				updatedProduct.id as string,
				currentUser.id as string
			)
			updatedProduct.picture = null
		}
	} else {
		updatedProduct.picture = data.product?.picture
	}

	return {
		product: RemoveProductPrivateInformation(updatedProduct),
	}
}
