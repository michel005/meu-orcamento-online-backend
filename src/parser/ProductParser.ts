import { ObjectId } from 'mongodb'
import { ProductType } from '../types/ProductType'
import { CustomerParser } from './CustomerParser'
import { PictureService } from '../service/PictureService'
import { PictureParser } from './PictureParser'
import { UserType } from '../types/UserType'

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
	currentUser,
}: {
	content: any
	hidePrivate?: boolean
	hideEntity?: boolean
	currentUser: UserType
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

	if (!hideEntity) {
		product.seller = sanitizedContent.seller
			? CustomerParser(sanitizedContent.seller, true, currentUser.user_name)
			: undefined
	}
	if (!hidePrivate) {
		product.user_id = UndefinedOrValueId(sanitizedContent?.user_id)
	}
	product.picture = PictureParser(
		content.picture,
		'product',
		sanitizedContent?._id,
		currentUser.user_name || '',
		sanitizedContent.updated || sanitizedContent.created
	)

	return product
}
