import { useSchemaValidation } from '../hooks/useSchemaValidation.js'

export const LoginSchema = useSchemaValidation({
	user_name: {
		mandatory: true,
	},
	password: {
		mandatory: true,
	},
})
