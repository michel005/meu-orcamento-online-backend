import { ObjectId } from 'mongodb'
import { ProductType } from '../types/ProductType'
import { CustomerParser } from './CustomerParser'
import { PictureService } from '../service/PictureService'
import { PictureParser } from './PictureParser'
import { UserType } from '../types/UserType'
import { SellType } from '../types/SellType'

const UndefinedOrValue = (value: any) => {
	return value === undefined ? undefined : value
}

const UndefinedOrValueId = (value: any) => {
	return !!value && ObjectId.isValid(value) ? new ObjectId(value) : undefined
}

export const SellParser = ({ content }: { content: any }): SellType => {
	const sell: SellType = {}
	const sanitizedContent = JSON.parse(JSON.stringify(content))
	sell._id = UndefinedOrValueId(sanitizedContent?._id)
	sell.created = UndefinedOrValue(sanitizedContent?.created)
	sell.updated = UndefinedOrValue(sanitizedContent?.updated)
	sell.customer = UndefinedOrValue(sanitizedContent?.customer)
	sell.customer_id = UndefinedOrValueId(sanitizedContent?.customer_id)
	sell.items = (sanitizedContent.items || []).map((x: any) => {
		return {
			product_id: x.product_id,
			percentage: x.percentage,
		}
	})
	sell.finalPrice = UndefinedOrValue(sanitizedContent?.finalPrice)
	sell.status = UndefinedOrValue(sanitizedContent?.status)

	return sell
}
