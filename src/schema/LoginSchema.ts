import { useSchemaValidation } from '../hooks/useSchemaValidation'

export const LoginSchema = useSchemaValidation({
	user_name: {
		mandatory: true,
	},
	password: {
		mandatory: true,
	},
})
