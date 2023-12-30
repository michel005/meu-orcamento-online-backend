import { Db, ObjectId } from 'mongodb'
import { ProductType } from '../types/ProductType'
import { ErrorCollection } from '../utils/ErrorCollection'

export class ProductBusiness {
	static databaseClient: Db

	static validate = async (product: ProductType) => {
		const errors = new ErrorCollection()

		errors.addConditionally(
			!product.code || product.code.trim() === '',
			'code',
			'VALIDATION-003'
		)
		if (!!product.code) {
			const productFound = await ProductBusiness.databaseClient
				.collection<ProductType>('product')
				.findOne({
					code: product.code,
					_id: { $ne: product._id },
				})
			errors.addConditionally(!!productFound, 'code', 'PRODUCT-002')
		}
		errors.addConditionally(
			!product.title || product.title.trim() === '',
			'title',
			'VALIDATION-003'
		)
		errors.addConditionally(
			!product.description || product.description.trim() === '',
			'description',
			'VALIDATION-003'
		)
		errors.addConditionally(!product.seller_id, 'seller_id', 'VALIDATION-003')
		errors.addConditionally(
			!!product.seller_id && !ObjectId.isValid(product.seller_id),
			'seller_id',
			'VALIDATION-004'
		)
		errors.addConditionally(!product.price || product.price === 0, 'price', 'VALIDATION-003')
		errors.addConditionally(
			!product.categories || product.categories.trim() === '',
			'categories',
			'VALIDATION-003'
		)
		errors.addConditionally(
			!product.status || product.status.trim() === '',
			'status',
			'VALIDATION-003'
		)
		errors.addConditionally(
			!!product.status &&
				!['AVAILABLE', 'RESERVED', 'SOLD', 'UNAVAILABLE', 'BLOCKED'].includes(
					product.status
				),
			'status',
			'PRODUCT-001'
		)

		errors.throw()
	}
}
