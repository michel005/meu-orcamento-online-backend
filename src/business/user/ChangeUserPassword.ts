import { PasswordChangeSchema } from '../../schema/PasswordChangeSchema'
import { newError } from '../../utils/ErrorUtils'
import { RemoveUserPrivateInformation } from './RemoveUserPrivateInformation'
import { UserType } from '../../types/User.type'
import { Database } from '../../middlewares/databases'

export const ChangeUserPassword = async ({
	currentUser,
	passwordInfo,
}: {
	currentUser: UserType
	passwordInfo: {
		old_password: string
		new_password: string
		new_password_confirm: string
	}
}) => {
	PasswordChangeSchema.throwValidation(passwordInfo)
	const errors: any = {}
	if (passwordInfo.old_password !== currentUser.password) {
		errors.old_password = newError('USER-001')
	}
	if (passwordInfo.new_password !== passwordInfo.new_password_confirm) {
		errors.new_password = newError('FIELD-003')
	}
	if (Object.keys(errors).length > 0) {
		throw errors
	}

	const updatedUser = await Database.user.update(currentUser.id as string, {
		...currentUser,
		address: undefined,
		password: passwordInfo.new_password_confirm,
	})
	return RemoveUserPrivateInformation(updatedUser)
}
