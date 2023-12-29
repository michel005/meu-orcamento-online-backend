import { ErrorCollection } from '../utils/ErrorCollection'
import { AddressBusiness } from './AddressBusiness'
import { CustomerType } from '../types/CustomerType'
import { Db, ObjectId } from 'mongodb'

export class CustomerBusiness {
	static databaseClient: Db

	static validate = async (customer: CustomerType) => {
		const errors = new ErrorCollection()

		errors.addConditionally(
			!customer.full_name || customer.full_name.trim() === '',
			'full_name',
			'VALIDATION-003'
		)
		errors.addConditionally(
			!customer.email || customer.email.trim() === '',
			'email',
			'VALIDATION-003'
		)
		errors.addConditionally(
			!customer.phone || customer.phone.trim() === '',
			'phone',
			'VALIDATION-003'
		)
		errors.addConditionally(
			!customer.person_type || customer.person_type.trim() === '',
			'person_type',
			'VALIDATION-003'
		)
		errors.addConditionally(
			!!customer.person_type && !['PF', 'PJ'].includes(customer.person_type),
			'person_type',
			'CUSTOMER-002'
		)
		errors.addConditionally(
			!customer.document_type || customer.document_type.trim() === '',
			'document_type',
			'VALIDATION-003'
		)
		errors.addConditionally(
			!!customer.document_type && !['RG', 'CPF', 'CNPJ'].includes(customer.document_type),
			'document_type',
			'CUSTOMER-003'
		)
		errors.addConditionally(
			!customer.document_number || customer.document_number.trim() === '',
			'document_number',
			'VALIDATION-003'
		)
		if (customer.person_type && customer.document_type && customer.document_number) {
			const customerFound = await CustomerBusiness.databaseClient
				.collection('customer')
				.findOne({
					person_type: customer.person_type,
					document_type: customer.document_type,
					document_number: customer.document_number,
					_id: { $ne: customer._id },
				})
			errors.addConditionally(!!customerFound, 'document_number', 'CUSTOMER-004')
		}
		try {
			if (customer.address) {
				AddressBusiness.validate(customer.address)
			}
		} catch (addressError) {
			errors.addCustom('address', addressError)
		}

		errors.throw()
	}
}
