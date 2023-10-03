import { useAuthentication } from '../../../middleware/useAuthentication.js'

export const Me = (app, database) => {
	const auth = useAuthentication()

	app.post('/api/user/me', (req, res) => {
		const findResult = auth.validate(req.headers?.auth_token)
		if (findResult) {
			res.status(200).json({
				...findResult,
				_id: undefined,
				password: undefined,
			})
		} else {
			res.status(404).send()
		}
	})
}
