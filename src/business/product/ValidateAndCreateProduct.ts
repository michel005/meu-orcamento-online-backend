import { DateUtils } from '../../utils/DateUtils'
import { ProductValidation } from '../../validations/ProductValidation'
import { ProductType } from '../../types/Product.type'
import { UserType } from '../../types/User.type'
import { DatabaseType } from '../../types/DatabaseType'
import { Database } from '../../middlewares/databases'

export const ValidateAndCreateProduct = async ({
	data,
	currentUser,
}: {
	data: {
		product: ProductType
	}
	currentUser: UserType
}) => {
	const product: ProductType = {
		...data.product,
		user_id: currentUser.id,
		created: DateUtils.dateTimeToString(new Date()),
	}
	await ProductValidation({
		value: product as ProductType,
		currentUser,
	})

	const newProduct = await Database.product.create({
		...product,
		user_id: currentUser.id as string,
		created: DateUtils.dateTimeToString(new Date()),
	})

	return {
		product: newProduct,
	}
}
