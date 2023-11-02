import { ValidateAndUpdateUser } from '../../../business/user/ValidateAndUpdateUser.js'
import { HandleBusinessResponseAsync } from '../../../business/HandleBusinessResponse.js'

export const Update = (app) => {
	app.put('/api/user', async (req, res) => {
		await HandleBusinessResponseAsync(res, async () => {
			return await ValidateAndUpdateUser(req.database.user, req.user, req.body)
		})
	})
}
