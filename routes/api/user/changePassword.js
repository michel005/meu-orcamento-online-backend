import { useSchemaValidation } from '../../../hooks/useSchemaValidation.js'
import { newError } from '../../../utils/ErrorUtils.js'
import { HandleBusinessResponseAsync } from '../../../business/HandleBusinessResponse.js'
import { RemoveUserPrivateInformation } from '../../../business/user/RemoveUserPrivateInformation.js'

export const ChangePassword = (app) => {
	const schema = useSchemaValidation({
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

	app.post('/api/user/changePassword', async (req, res) => {
		const oldPassword = req.body?.old_password
		const newPassword = req.body?.new_password
		const newPasswordConfirm = req.body?.new_password_confirm

		await HandleBusinessResponseAsync(res, async () => {
			schema.throwValidation(req.body)
			const errors = {}
			if (oldPassword !== req.user.password) {
				errors.old_password = newError('USER-001')
			}
			if (newPassword && newPasswordConfirm && newPassword !== newPasswordConfirm) {
				errors.new_password = newError('FIELD-003')
			}
			if (Object.keys(errors).length > 0) {
				throw errors
			}

			const updatedUser = await req.database.user.update(req.user._id, {
				...req.user,
				password: newPasswordConfirm,
			})

			return RemoveUserPrivateInformation(updatedUser)
		})
	})
}
