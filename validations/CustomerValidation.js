import { CustomerSchema } from '../schema/CustomerSchema.js'
import { newError } from '../utils/ErrorUtils.js'

export const CustomerValidation = async ({ value, database }) => {
	let validPersonType = false

	const errors = {}
	if (value?.person_type && !['PF', 'PJ'].includes(value?.person_type)) {
		errors.person_type = newError('FIELD-001!')
	} else {
		validPersonType = true
	}

	let validDocumentType = false
	if (validPersonType && value?.document_type) {
		if (value.person_type === 'PF' && !['RG', 'CPF'].includes(value.document_type)) {
			errors.document_type = newError('FIELD-002')
		} else if (value.person_type === '`PJ`' && value.document_type !== 'CNPJ') {
			errors.document_type = newError('FIELD-002')
		} else {
			validDocumentType = true
		}
	}

	let validDocumentNumber = false
	if (value.document_type) {
		if (value.document_type === 'RG' && value.document_number.length > 9) {
			errors.document_number = newError('FIELD-003')
		} else if (value.document_type === 'CPF' && value.document_number.length > 11) {
			errors.document_number = newError('FIELD-003')
		} else if (value.document_type === 'CNPJ' && value.document_number.length > 14) {
			errors.document_number = newError('FIELD-003')
		} else {
			validDocumentNumber = true
		}
	}

	if (validPersonType && validDocumentType && validDocumentNumber) {
		const customerFinded = await database.findMany({
			NOT: {
				id: value.id,
			},
			user_id: value.user_id,
			person_type: value.person_type,
			document_type: value.document_type,
			document_number: value.document_number,
		})
		if (customerFinded.length > 0) {
			errors.document_number = newError('DATABASE-001')
		}
	}

	if (value?.email) {
		const customerFinded = await database.findMany({
			NOT: {
				id: value.id,
			},
			user_id: value.user_id,
			email: value.email,
		})
		if (customerFinded.length > 0) {
			errors.email = newError('DATABASE-001')
		}
	}
	return {
		hasError: Object.keys(errors).length > 0,
		errors,
	}
}
