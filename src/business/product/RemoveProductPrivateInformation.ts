import { ProductType } from '../../types/Product.type'

export const RemoveProductPrivateInformation = (product: ProductType) => {
	return {
		...product,
		user_id: undefined,
	}
}
