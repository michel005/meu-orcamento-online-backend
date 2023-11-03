import { useSchemaValidation } from '../hooks/useSchemaValidation.js'

export const UserSchema = useSchemaValidation({
	picture: {
		mandatory: false,
	},
	full_name: {
		mandatory: true,
	},
	user_name: {
		mandatory: true,
	},
	email: {
		mandatory: true,
	},
	birthday: {
		mandatory: false,
	},
	phone: {
		mandatory: false,
	},
	password: {
		mandatory: true,
	},
	address: {
		mandatory: false,
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
})
