import { CustomerType } from '../types/CustomerType'
import { AddressParser } from './AddressParser'
import { PictureService } from '../service/PictureService'
import { UserType } from '../types/UserType'
import { PictureParser } from './PictureParser'

const UndefinedOrValue = (value: any) => {
	return value === undefined ? undefined : value
}

export const CustomerParser = (content: any, hidePrivate = false): CustomerType => {
	const customer: CustomerType = {}
	customer._id = UndefinedOrValue(content?._id)
	customer.created = UndefinedOrValue(content?.created)
	customer.updated = UndefinedOrValue(content?.updated)
	customer.active = UndefinedOrValue(content?.active)
	customer.favorite = UndefinedOrValue(content?.favorite)
	customer.person_type = UndefinedOrValue(content?.person_type)
	customer.document_type = UndefinedOrValue(content?.document_type)
	customer.document_number = UndefinedOrValue(content?.document_number)
	customer.full_name = UndefinedOrValue(content?.full_name)
	customer.email = UndefinedOrValue(content?.email)
	customer.phone = UndefinedOrValue(content?.phone)
	customer.birthday = UndefinedOrValue(content?.birthday)
	customer.picture = PictureParser(content.picture, 'customer', content?._id.toString())
	customer.address = AddressParser(content?.address || {})
	if (!hidePrivate) {
		customer.user_id = UndefinedOrValue(content?.user_id)
	}

	return JSON.parse(JSON.stringify(customer))
}

export const CustomerPropParser = (propName: string, propValue: string) => {
	if (['active', 'favorite'].includes(propName)) {
		return propValue === 'true'
	}
	return propValue
}
