import { useSchemaValidation } from '../../../hooks/useSchemaValidation.js'
import { newError } from '../../../utils/ErrorUtils.js'

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

		try {
			schema.throwValidation(req.body)
			const errors = {}
			if (oldPassword !== req.user.password) {
				errors.old_password = newError('USER-001')
			}
			if (newPassword && newPasswordConfirm && newPassword !== newPasswordConfirm) {
				errors.new_password = newError('FIELD-003')
			}
			if (Object.keys(errors).length > 0) {
				res.status(400).json(errors)
				return
			}

			const updatedUser = await req.database.user.update(req.user._id, {
				...req.user,
				_id: req.user._id,
				user_name: req.user.user_name,
				password: newPasswordConfirm,
			})
			res.status(200).json({
				...updatedUser,
				_id: undefined,
				password: undefined,
			})
		} catch (error) {
			res.status(400).json(error)
		}
	})
}
