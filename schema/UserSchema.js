import { useSchemaValidation } from '../hooks/useSchemaValidation.js'

export const UserSchema = useSchemaValidation({
	_id: {
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
	password: {
		mandatory: true,
	},
})
