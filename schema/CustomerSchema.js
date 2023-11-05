import { useSchemaValidation } from '../hooks/useSchemaValidation.js'

export const CustomerSchema = useSchemaValidation({
	id: {
		mandatory: false,
	},
	created: {
		mandatory: false,
	},
	updated: {
		mandatory: false,
	},
	picture: {
		mandatory: false,
	},
	birthday: {
		mandatory: false,
	},
	full_name: {
		mandatory: true,
	},
	person_type: {
		mandatory: true,
	},
	phone: {
		mandatory: false,
	},
	document_type: {
		mandatory: true,
	},
	document_number: {
		mandatory: true,
	},
	email: {
		mandatory: true,
	},
	active: {
		mandatory: true,
	},
	favorite: {
		mandatory: false,
	},
	user_id: {
		mandatory: false,
	},
	address_id: {
		mandatory: false,
	},
})
