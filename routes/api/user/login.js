import { HandleBusinessResponseAsync } from '../../../business/HandleBusinessResponse.js'
import { LoginUserWithUserNameAndPassword } from '../../../business/user/LoginUserWithUserNameAndPassword.js'

export const Login = (app) => {
	app.post('/api/user/login', async (req, res) => {
		await HandleBusinessResponseAsync(res, async () => {
			return LoginUserWithUserNameAndPassword(
				req.database.user,
				req.database.user_token,
				req.body?.user_name,
				req.body?.password,
				req.ip
			)
		})
	})
}
