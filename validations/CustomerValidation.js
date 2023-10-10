import { CustomerSchema } from '../schema/CustomerSchema.js'

export const CustomerValidation = ({ value, errors, database }) => {
	const validation = CustomerSchema.validate(value)

	if (validation.hasError) {
		return {
			...validation.errors,
		}
	}

	let validPersonType = false

	if (value?.person_type && !['PF', 'PJ'].includes(value?.person_type)) {
		errors.person_type = 'FIELD-001!'
	} else {
		validPersonType = true
	}

	let validDocumentType = false
	if (value?.document_type && value.person_type) {
		if (value.person_type === 'PF' && !['RG', 'CPF'].includes(value.document_type)) {
			errors.document_type = 'FIELD-002'
		} else if (value.person_type === '`PJ`' && value.document_type !== 'CNPJ') {
			errors.document_type = 'FIELD-002'
		} else {
			validDocumentType = true
		}
	}

	let validDocumentNumber = false
	if (value.document_type) {
		if (value.document_type === 'RG' && value.document_number.length > 9) {
			errors.document_number = 'FIELD-003'
		} else if (value.document_type === 'CPF' && value.document_number.length > 11) {
			errors.document_number = 'FIELD-003'
		} else if (value.document_type === 'CNPJ' && value.document_number.length > 14) {
			errors.document_number = 'FIELD-003'
		} else {
			validDocumentNumber = true
		}
	}

	if (validPersonType && validDocumentType && validDocumentNumber) {
		const customerFinded = database.findOne({
			query: (x) =>
				x._id !== value._id &&
				x.user_id === value.user_id &&
				x.person_type === value.person_type &&
				x.document_type === value.document_type &&
				x.document_number === value.document_number,
		})
		if (customerFinded) {
			errors.document_number = 'DATABASE-001'
		}
	}

	if (value?.email) {
		const customerFinded = database.findOne({
			query: (x) =>
				x._id !== value._id && x.user_id === value.user_id && x.email === value.email,
		})
		if (customerFinded) {
			errors.email = 'DATABASE-001'
		}
	}
	return errors
}
