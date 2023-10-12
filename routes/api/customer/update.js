import { DateUtils } from '../../../utils/DateUtils.js'
import { CustomerValidation } from '../../../validations/CustomerValidation.js'

export const Update = (app) => {
	app.put('/api/customer/:id', async (req, res) => {
		try {
			const findedCustomer = (
				await req.database.customer.findMany({
					_id: req.params.id,
					user_id: req.user._id,
				})
			)?.[0]
			const value = {
				...findedCustomer,
				...req.body,
				address: req.body?.address || {},
				updated: DateUtils.dateTimeToString(new Date()),
				created: findedCustomer.created,
				_id: findedCustomer._id,
				user_id: findedCustomer.user_id,
			}
			await CustomerValidation({
				value,
				database: req.database.customer,
			})

			const response = await req.database.customer.update(req.params.id, value)
			res.status(200).json({
				...response,
				user_id: undefined,
			})
		} catch (error) {
			res.status(400).json(error)
		}
	})
}
