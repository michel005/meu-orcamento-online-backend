import { Collection, ObjectId } from 'mongodb'
import { CustomerBusiness } from '../business/CustomerBusiness'
import { CustomerParser, CustomerPropParser } from '../parser/CustomerParser'
import { CustomerType } from '../types/CustomerType'
import { UserType } from '../types/UserType'
import { DateUtils } from '../utils/DateUtils'
import { ErrorUtils } from '../utils/ErrorUtils'
import { PictureType } from '../types/PictureType'
import { PictureService } from './PictureService'

export class CustomerService {
	static customerDatabase: Collection<CustomerType>

	static saveImage = ({
		picture,
		customerId,
		userName,
	}: {
		picture?: PictureType
		customerId?: string
		userName?: string
	}) => {
		if (!userName) {
			return
		}
		if (picture) {
			if (picture.type === 'file' && customerId) {
				PictureService.save(picture.value, 'customer', customerId, userName)
			}
		} else {
			if (customerId) {
				PictureService.remove('customer', customerId, userName)
			}
		}
	}

	static create = async ({
		customer,
		currentUser,
	}: {
		customer: CustomerType
		currentUser: UserType
	}) => {
		await CustomerBusiness.validate(customer)
		const insertedCustomer = await CustomerService.customerDatabase.insertOne({
			full_name: customer.full_name,
			email: customer.email,
			phone: customer.phone,
			birthday: customer.birthday,
			person_type: customer.person_type,
			document_type: customer.document_type,
			document_number: customer.document_number,
			address: customer.address,
			user_id: currentUser._id,
			active: true,
			favorite: false,
			created: DateUtils.dateTimeToString(new Date()),
		})

		const refreshCustomer = await CustomerService.customerDatabase.findOne({
			_id: insertedCustomer.insertedId,
		})
		CustomerService.saveImage({
			picture: customer.picture,
			customerId: insertedCustomer.insertedId.toString(),
			userName: currentUser?.user_name,
		})
		return CustomerParser(refreshCustomer, true, currentUser.user_name)
	}

	static update = async ({
		id,
		customer,
		currentUser,
	}: {
		id: ObjectId
		customer: CustomerType
		currentUser: UserType
	}) => {
		const savedCustomer = await CustomerService.customerDatabase.findOne({
			_id: id,
			user_id: currentUser._id,
		})
		if (!savedCustomer) {
			throw ErrorUtils.getError('CUSTOMER-001')
		}
		await CustomerBusiness.validate({
			...customer,
			_id: id,
		})
		await CustomerService.customerDatabase.updateOne(
			{
				_id: id,
			},
			{
				$set: {
					full_name: customer.full_name,
					email: customer.email,
					phone: customer.phone,
					birthday: customer.birthday,
					person_type: customer.person_type,
					document_type: customer.document_type,
					document_number: customer.document_number,
					address: customer.address,
				},
			}
		)
		const updatedCustomer = await CustomerService.customerDatabase.findOne({
			_id: id,
			user_id: currentUser._id,
		})
		CustomerService.saveImage({
			picture: customer.picture,
			customerId: id.toString(),
			userName: currentUser?.user_name,
		})
		return CustomerParser(updatedCustomer, true, currentUser.user_name)
	}

	static updateProperty = async ({
		id,
		propName,
		propValue,
		currentUser,
	}: {
		id: ObjectId
		propName: string
		propValue: string
		currentUser: UserType
	}) => {
		const savedCustomer: CustomerType | null = await CustomerService.customerDatabase.findOne({
			_id: id,
			user_id: currentUser._id,
		})
		if (!savedCustomer) {
			throw ErrorUtils.getError('CUSTOMER-001')
		}
		if (!['favorite', 'active'].includes(propName)) {
			throw ErrorUtils.getError('VALIDATION-005')
		}
		await CustomerService.customerDatabase.updateOne(
			{
				_id: id,
			},
			{
				$set: {
					[propName]: CustomerPropParser(propName, propValue),
				},
			}
		)
		const updatedCustomer = await CustomerService.customerDatabase.findOne({
			_id: id,
			user_id: currentUser._id,
		})
		return CustomerParser(updatedCustomer, true, currentUser.user_name)
	}

	static remove = async ({ id, currentUser }: { id: ObjectId; currentUser: UserType }) => {
		const savedCustomer = await CustomerService.customerDatabase.findOne({
			_id: id,
			user_id: currentUser._id,
		})
		if (!savedCustomer) {
			throw ErrorUtils.getError('CUSTOMER-001')
		}
		await CustomerService.customerDatabase.deleteOne({
			_id: savedCustomer?._id,
		})
	}

	static getOne = async ({ id, currentUser }: { id: ObjectId; currentUser: UserType }) => {
		const customerFind = await CustomerService.customerDatabase.findOne(id)
		return CustomerParser(customerFind, true, currentUser.user_name)
	}

	static getAll = async ({
		personType,
		currentUser,
	}: {
		personType: string | null
		currentUser: UserType
	}) => {
		const extraFilters: any = {}

		if (personType) {
			extraFilters.person_type = personType
		}

		const allCustomersByUser = await CustomerService.customerDatabase
			.find()
			.filter({
				user_id: currentUser._id,
			})
			.toArray()
		return allCustomersByUser.map((customer) =>
			CustomerParser(customer, true, currentUser.user_name)
		)
	}
}
