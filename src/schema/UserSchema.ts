import { useSchemaValidation } from '../hooks/useSchemaValidation'

export const UserSchema = useSchemaValidation({
	id: {
		mandatory: false,
	},
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
})
