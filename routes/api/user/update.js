import { useAuthentication } from '../../../middleware/useAuthentication.js'

export const Update = (app, database) => {
	const auth = useAuthentication()

	app.put('/api/user', (req, res) => {
		const findResult = auth.validate(req.headers?.auth_token)
		if (!findResult) {
			res.status(400).send('Token not valid!')
			return
		}
		database.update({
			id: findResult._id,
			value: {
				...findResult,
				...req.body,
				_id: findResult._id,
				_token: findResult._token,
				username: findResult.username,
				password: findResult.password,
			},
			onSuccess: (result) => {
				res.status(200).json({
					...result,
					_id: undefined,
					_token: undefined,
					password: undefined,
				})
			},
			onError: (errors) => {
				res.status(400).json(errors.message)
			},
		})
	})
}
