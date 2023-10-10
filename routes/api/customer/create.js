import { DateUtils } from '../../../utils/DateUtils.js'
import { CustomerValidation } from '../../../validations/CustomerValidation.js'

export const Create = (app) => {
	app.post('/api/customer', (req, res) => {
		req.database.customer.create({
			value: {
				...req.body,
				address: req.body?.address || {},
				created: DateUtils.dateTimeToString(new Date()),
				updated: undefined,
				user_id: req.user._id,
			},
			validate: (value, errors) =>
				CustomerValidation({
					value,
					errors,
					database: req.database.customer,
				}),
			onSuccess: (result) => {
				res.status(200).json({
					...result,
					user_id: undefined,
				})
			},
			onError: (errors) => {
				res.status(400).json(errors?.message || errors)
			},
		})
	})
}
