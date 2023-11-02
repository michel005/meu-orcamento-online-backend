import { RemoveCustomerPrivateInformation } from '../../../business/customer/RemoveCustomerPrivateInformation.js'

export const FindAll = (app) => {
	app.get('/api/customer', async (req, res) => {
		const allCustomers = await req.database.customer.findMany({ user_id: req.user._id })
		res.status(200).json(allCustomers.map((x) => RemoveCustomerPrivateInformation(x)))
	})
}
