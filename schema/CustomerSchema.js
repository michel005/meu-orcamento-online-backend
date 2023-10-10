import { useSchemaValidation } from '../hooks/useSchemaValidation.js'

export const CustomerSchema = useSchemaValidation({
	_id: {
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
	name: {
		mandatory: true,
	},
	person_type: {
		mandatory: true,
	},
	phone: {
		mandatory: true,
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
	address: {
		mandatory: true,
		subSchema: {
			zip_code: {
				mandatory: true,
			},
			street_number: {
				mandatory: true,
			},
			street_name: {
				mandatory: true,
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
