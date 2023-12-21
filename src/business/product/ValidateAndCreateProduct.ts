import { DateUtils } from '../../utils/DateUtils'
import { ProductValidation } from '../../validations/ProductValidation'
import { ProductType } from '../../types/Product.type'
import { UserType } from '../../types/User.type'
import { Database } from '../../middlewares/databases'
import { SendFileByTypeAndIdentifier } from '../files/SendFileByTypeAndIdentifier'
import { RemoveFileByTypeAndIdentifier } from '../files/RemoveFileByTypeAndIdentifier'
import { ProductSchema } from '../../schema/ProductSchema'

export const ValidateAndCreateProduct = async ({
	data,
	currentUser,
}: {
	data: {
		product: ProductType
	}
	currentUser: UserType
}) => {
	const value: ProductType = {
		...data.product,
		product_waiting_list: undefined,
		picture: undefined,
		user_id: currentUser.id,
		created: DateUtils.dateTimeToString(new Date()),
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

	const newProduct = await Database.product.create(value)

	RemoveFileByTypeAndIdentifier('product', newProduct.id as string, currentUser.id as string)
	if (data.product?.picture) {
		newProduct.picture = SendFileByTypeAndIdentifier(
			'product',
			newProduct.id as string,
			data.product?.picture,
			currentUser.id as string
		)
	}

	return {
		product: newProduct,
	}
}
