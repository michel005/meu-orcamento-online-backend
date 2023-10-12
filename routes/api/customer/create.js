import { DateUtils } from '../../../utils/DateUtils.js'
import { CustomerValidation } from '../../../validations/CustomerValidation.js'

export const Create = (app) => {
	app.post('/api/customer', async (req, res) => {
		try {
			const value = {
				...req.body,
				address: req.body?.address || {},
				created: DateUtils.dateTimeToString(new Date()),
				updated: undefined,
				user_id: req.user._id,
			}
			await CustomerValidation({
				value,
				database: req.database.customer,
			})

			const response = await req.database.customer.create(value)
			res.status(200).json({
				...response,
				user_id: undefined,
			})
		} catch (error) {
			res.status(400).json(error)
		}
	})
}
