import { useSchemaValidation } from '../hooks/useSchemaValidation.js'

export const CustomerSchema = useSchemaValidation({
	id: {
		mandatory: false,
	},
	created: {
		mandatory: true,
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
	name: {
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
	address: {
		mandatory: true,
		subSchema: {
			zip_code: {
				mandatory: false,
			},
			street_number: {
				mandatory: false,
			},
			street_name: {
				mandatory: false,
			},
			complement: {
				mandatory: false,
			},
			city: {
				mandatory: true,
			},
			state: {
				mandatory: true,
			},
			country: {
				mandatory: true,
			},
		},
	},
	user_id: {
		mandatory: true,
	},
})
