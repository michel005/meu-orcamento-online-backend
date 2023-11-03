import { useSchemaValidation } from '../hooks/useSchemaValidation.js'

export const PasswordChangeSchema = useSchemaValidation({
	old_password: {
		mandatory: true,
	},
	new_password: {
		mandatory: true,
	},
	new_password_confirm: {
		mandatory: true,
	},
})
