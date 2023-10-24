import { v4 as uuid } from 'uuid'

export const Login = (app) => {
	app.post('/api/user/login', async (req, res) => {
		res.status(200).json({
			user_name: 'michel005',
			full_name: 'Michel Douglas Grigoli',
			picture: null,
			email: 'mdgrigoli@hotmail.com.br',
			token: uuid(),
			_id: undefined,
		})
	})
}
