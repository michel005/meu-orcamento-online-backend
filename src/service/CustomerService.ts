import { Collection, ObjectId } from 'mongodb'
import { CustomerBusiness } from '../business/CustomerBusiness'
import { CustomerParser } from '../parser/CustomerParser'
import { CustomerType } from '../types/CustomerType'
import { UserType } from '../types/UserType'
import { DateUtils } from '../utils/DateUtils'
import { ErrorUtils } from '../utils/ErrorUtils'

export class CustomerService {
	static customerDatabase: Collection<CustomerType>

	static create = async ({
		customer,
		currentUser,
	}: {
		customer: CustomerType
		currentUser: UserType
	}) => {
		await CustomerBusiness.validate(customer)
		const insertedCustomer = await CustomerService.customerDatabase.insertOne({
			...customer,
			_id: undefined,
			user_id: currentUser._id,
			created: DateUtils.dateTimeToString(new Date()),
		})

		const refreshCustomer = await CustomerService.customerDatabase.findOne({
			_id: insertedCustomer.insertedId,
		})
		return CustomerParser(refreshCustomer, true)
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
				$set: JSON.parse(
					JSON.stringify({
						...customer,
						_id: undefined,
						user_id: undefined,
						created: undefined,
						updated: DateUtils.dateTimeToString(new Date()),
					})
				),
			}
		)
		const updatedUser = await CustomerService.customerDatabase.findOne({
			_id: id,
			user_id: currentUser._id,
		})
		return CustomerParser(updatedUser, true)
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
				...extraFilters,
				user_id: currentUser._id,
			})
			.toArray()
		return allCustomersByUser.map((customer) => CustomerParser(customer, true))
	}
}
