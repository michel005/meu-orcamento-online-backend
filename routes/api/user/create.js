import { UserValidation } from '../../../validations/UserValidation.js'

export const Create = (app) => {
	app.post('/api/user', async (req, res) => {
		try {
			await UserValidation({
				value: req.body,
				database: req.database.user,
			})
			const response = await req.database.user.create(req.body)
			res.status(200).json({
				...response,
				_id: undefined,
				password: undefined,
			})
		} catch (error) {
			res.status(400).json(error)
		}
	})
}
