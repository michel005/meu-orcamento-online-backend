import { ValidateAndCreateUser } from '../../../business/user/ValidateAndCreateUser.js'
import { HandleBusinessResponseAsync } from '../../../business/HandleBusinessResponse.js'

export const Create = (app) => {
	app.post('/api/user', async (req, res) => {
		await HandleBusinessResponseAsync(res, async () => {
			return await ValidateAndCreateUser(req.database.user, req.body)
		})
	})
}
