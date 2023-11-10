import { PasswordChangeSchema } from '../../schema/PasswordChangeSchema.js'
import { newError } from '../../utils/ErrorUtils.js'
import { RemoveUserPrivateInformation } from './RemoveUserPrivateInformation.js'

export const ChangeUserPassword = async (
	database,
	currentUser,
	oldPassword,
	newPassword,
	newPasswordConfirm
) => {
	PasswordChangeSchema.throwValidation({
		old_password: oldPassword,
		new_password: newPassword,
		new_password_confirm: newPasswordConfirm,
	})
	const errors = {}
	if (oldPassword !== currentUser.password) {
		errors.old_password = newError('USER-001')
	}
	if (newPassword !== newPasswordConfirm) {
		errors.new_password = newError('FIELD-003')
	}
	if (Object.keys(errors).length > 0) {
		throw errors
	}

	const updatedUser = await database.update(currentUser.id, {
		...currentUser,
		address: undefined,
		password: newPasswordConfirm,
	})
	return RemoveUserPrivateInformation(updatedUser)
}
