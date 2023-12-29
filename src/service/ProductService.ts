import { Collection, ObjectId } from 'mongodb'
import { ProductBusiness } from '../business/ProductBusiness'
import { ProductParser } from '../parser/ProductParser'
import { CustomerType } from '../types/CustomerType'
import { ProductType } from '../types/ProductType'
import { UserType } from '../types/UserType'
import { DateUtils } from '../utils/DateUtils'
import { ErrorUtils } from '../utils/ErrorUtils'

export class ProductService {
	static productDatabase: Collection<ProductType>

	static create = async ({
		product,
		currentUser,
	}: {
		product: ProductType
		currentUser: UserType
	}) => {
		await ProductBusiness.validate(product)
		const insertedProduct = await ProductService.productDatabase.insertOne({
			...product,
			_id: undefined,
			user_id: currentUser._id,
			created: DateUtils.dateTimeToString(new Date()),
		})

		const refreshProduct = await ProductService.productDatabase.findOne({
			_id: insertedProduct.insertedId,
		})
		return ProductParser({ content: refreshProduct, hidePrivate: true })
	}

	static update = async ({
		id,
		product,
		currentUser,
	}: {
		id: ObjectId
		product: ProductType
		currentUser: UserType
	}) => {
		const savedCustomer = await ProductService.productDatabase.findOne({
			_id: id,
			user_id: currentUser._id,
		})
		if (!savedCustomer) {
			throw ErrorUtils.getError('PRODUCT-003')
		}
		await ProductBusiness.validate({
			...product,
			_id: id,
		})
		await ProductService.productDatabase.updateOne(
			{
				_id: id,
			},
			{
				$set: JSON.parse(
					JSON.stringify({
						...product,
						_id: undefined,
						user_id: undefined,
						created: undefined,
						updated: DateUtils.dateTimeToString(new Date()),
					})
				),
			}
		)
		const updatedProduct = await ProductService.productDatabase.findOne({
			_id: id,
			user_id: currentUser._id,
		})
		return ProductParser({ content: updatedProduct, hidePrivate: true })
	}

	static remove = async ({ id, currentUser }: { id: ObjectId; currentUser: UserType }) => {
		const savedProduct = await ProductService.productDatabase.findOne({
			_id: id,
			user_id: currentUser._id,
		})
		if (!savedProduct) {
			throw ErrorUtils.getError('PRODUCT-003')
		}
		await ProductService.productDatabase.deleteOne({
			_id: id,
		})
	}

	static getAll = async ({ currentUser }: { currentUser: UserType }) => {
		const allCustomersByUser = await ProductService.productDatabase
			.aggregate([
				{
					$lookup: {
						from: 'customer',
						localField: 'customer_id',
						foreignField: '_id',
						as: 'customer',
						pipeline: [
							{
								$limit: 1,
							},
						],
					},
				},
				{
					$unwind: '$customer',
				},
				{
					$lookup: {
						from: 'customer',
						localField: 'seller_id',
						foreignField: '_id',
						as: 'seller',
						pipeline: [
							{
								$limit: 1,
							},
						],
					},
				},
				{
					$unwind: '$seller',
				},
				{
					$match: {
						user_id: currentUser._id,
					},
				},
			])
			.toArray()
		return allCustomersByUser.map((product) =>
			ProductParser({ content: product, hidePrivate: true })
		)
	}
}
