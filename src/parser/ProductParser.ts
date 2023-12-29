import { ObjectId } from 'mongodb'
import { ProductType } from '../types/ProductType'
import { CustomerParser } from './CustomerParser'

const UndefinedOrValue = (value: any) => {
	return value === undefined ? undefined : value
}

const UndefinedOrValueId = (value: any) => {
	return !!value && ObjectId.isValid(value) ? new ObjectId(value) : undefined
}

export const ProductParser = ({
	content,
	hidePrivate = false,
	hideEntity = false,
}: {
	content: any
	hidePrivate?: boolean
	hideEntity?: boolean
}): ProductType => {
	const product: ProductType = {}
	const sanitizedContent = JSON.parse(JSON.stringify(content))
	product._id = UndefinedOrValueId(sanitizedContent?._id)
	product.created = UndefinedOrValue(sanitizedContent?.created)
	product.updated = UndefinedOrValue(sanitizedContent?.updated)
	product.code = UndefinedOrValue(sanitizedContent?.code)
	product.title = UndefinedOrValue(sanitizedContent?.title)
	product.description = UndefinedOrValue(sanitizedContent?.description)
	product.categories = UndefinedOrValue(sanitizedContent?.categories)
	product.price = UndefinedOrValue(sanitizedContent?.price)
	product.status = UndefinedOrValue(sanitizedContent?.status)
	product.seller_id = UndefinedOrValueId(sanitizedContent?.seller_id)
	product.customer_id = UndefinedOrValueId(sanitizedContent?.customer_id)

	if (!hideEntity) {
		product.seller = sanitizedContent.seller
			? CustomerParser(sanitizedContent.seller, true)
			: undefined
		product.customer = sanitizedContent.customer
			? CustomerParser(sanitizedContent.customer, true)
			: undefined
	}
	if (!hidePrivate) {
		product.user_id = UndefinedOrValueId(sanitizedContent?.user_id)
	}

	return product
}
