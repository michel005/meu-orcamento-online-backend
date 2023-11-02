import { HandleBusinessResponseAsync } from '../../../business/HandleBusinessResponse.js'
import { ValidateAndUpdateCustomer } from '../../../business/customer/ValidateAndUpdateCustomer.js'

export const Update = (app) => {
	app.put('/api/customer/:id', async (req, res) => {
		await HandleBusinessResponseAsync(res, async () => {
			return await ValidateAndUpdateCustomer(req.database.customer, req.params.id, req.body)
		})
	})
}
