import { Collection, ObjectId } from 'mongodb'
import { ProductBusiness } from '../business/ProductBusiness'
import { ProductParser } from '../parser/ProductParser'
import { ProductType } from '../types/ProductType'
import { UserType } from '../types/UserType'
import { DateUtils } from '../utils/DateUtils'
import { ErrorUtils } from '../utils/ErrorUtils'
import { PictureType } from '../types/PictureType'
import { PictureService } from './PictureService'
import { CustomerService } from './CustomerService'

export class ProductService {
	static productDatabase: Collection<ProductType>

	static saveImage = ({
		picture,
		productId,
		userName,
	}: {
		picture?: PictureType
		productId?: string
		userName?: string
	}) => {
		if (!userName) {
			return
		}
		if (picture) {
			if (picture.type === 'file' && productId) {
				PictureService.save(picture.value, 'product', productId, userName)
			}
		} else {
			if (productId) {
				PictureService.remove('product', productId, userName)
			}
		}
	}

	static create = async ({
		product,
		currentUser,
	}: {
		product: ProductType
		currentUser: UserType
	}) => {
		await ProductBusiness.validate(product)
		const insertedProduct = await ProductService.productDatabase.insertOne({
			created: DateUtils.dateTimeToString(new Date()),
			code: product.code,
			title: product.title,
			description: product?.description,
			categories: product?.categories,
			price: product?.price,
			status: product?.status,
			seller_id:
				product?.seller_id && ObjectId.isValid(product?.seller_id)
					? new ObjectId(product?.seller_id)
					: undefined,
			user_id: currentUser._id,
		})

		const refreshProduct = await ProductService.productDatabase.findOne({
			_id: insertedProduct.insertedId,
		})
		ProductService.saveImage({
			picture: product.picture,
			productId: product._id?.toString(),
			userName: currentUser.user_name,
		})
		return ProductParser({ content: refreshProduct, hidePrivate: true, currentUser })
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
				$set: {
					code: product.code,
					title: product.title,
					description: product?.description,
					categories: product?.categories,
					price: product?.price,
					status: product?.status,
					seller_id:
						product?.seller_id && ObjectId.isValid(product?.seller_id)
							? new ObjectId(product?.seller_id)
							: undefined,
					updated: DateUtils.dateTimeToString(new Date()),
				},
			}
		)
		const updatedProduct = await ProductService.productDatabase.findOne({
			_id: id,
			user_id: currentUser._id,
		})
		ProductService.saveImage({
			picture: product.picture,
			productId: product._id?.toString(),
			userName: currentUser.user_name,
		})
		return ProductParser({ content: updatedProduct, hidePrivate: true, currentUser })
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
		let allProductsByUser = await ProductService.productDatabase.find().toArray()

		const response = []
		for (const product of allProductsByUser) {
			product.seller = product.seller_id
				? await CustomerService.getOne({
						id: new ObjectId(product.seller_id),
						currentUser,
				  })
				: undefined
			response.push(ProductParser({ content: product, hidePrivate: true, currentUser }))
		}
		return response
	}
}
