import { HandleBusinessResponseAsync } from '../../../business/HandleBusinessResponse.js'
import { ValidateAndCreateCustomer } from '../../../business/customer/ValidateAndCreateCustomer.js'

export const Create = (app) => {
	app.post('/api/customer', async (req, res) => {
		await HandleBusinessResponseAsync(res, async () => {
			return await ValidateAndCreateCustomer(req.database.customer, req.body, req.user)
		})
	})
}
