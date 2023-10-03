import { useAuthentication } from '../../../middleware/useAuthentication.js'

export const ChangePassword = (app, database) => {
	const auth = useAuthentication()

	app.post('/api/user/changePassword', (req, res) => {
		const findResult = auth.validate(req.headers?.auth_token)
		if (!findResult) {
			res.status(400).send('Token not valid!')
			return
		}
		const oldPassword = req.body?.old_password
		const newPassword = req.body?.new_password
		const newPasswordConfirm = req.body?.new_password_confirm

		database.update({
			id: findResult._id,
			value: {
				...findResult,
				_id: findResult._id,
				_token: findResult._token,
				username: findResult.username,
				password: newPasswordConfirm,
			},
			validate: (_, errors) => {
				if (!oldPassword) {
					errors.old_password = 'Not informed!'
				} else if (oldPassword !== findResult.password) {
					errors.old_password = 'Wrong!'
				}
				if (!newPassword) {
					errors.new_password = 'Not informed!'
				}
				if (!newPasswordConfirm) {
					errors.new_password_confirm = 'Not informed!'
				}
				if (newPassword && newPasswordConfirm && newPassword !== newPasswordConfirm) {
					errors.new_password = 'Does not match with confirmation!'
				}
				return errors
			},
			onSuccess: () => {
				res.status(200).send()
			},
			onError: (errors) => {
				res.status(400).json(errors)
			},
		})
	})
}
