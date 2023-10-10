import { DateUtils } from '../../../utils/DateUtils.js'
import { CustomerValidation } from '../../../validations/CustomerValidation.js'

export const Update = (app) => {
	app.put('/api/customer/:id', (req, res) => {
		const findedCustomer = req.database.customer.findOne({
			query: (x) => x._id === req.params.id && x.user_id === req.user._id,
		})
		req.database.customer.update({
			id: findedCustomer._id,
			value: {
				...findedCustomer,
				...req.body,
				address: req.body?.address || {},
				updated: DateUtils.dateTimeToString(new Date()),
				created: findedCustomer.created,
				_id: findedCustomer._id,
				user_id: findedCustomer.user_id,
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
