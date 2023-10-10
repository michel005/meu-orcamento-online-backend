import { DateUtils } from '../../../utils/DateUtils.js'
import { CustomerValidation } from '../../../validations/CustomerValidation.js'

export const Delete = (app) => {
	app.delete('/api/customer/:id', (req, res) => {
		req.database.customer.remove({
			id: req.params.id,
			onSuccess: () => {
				res.status(200).send()
			},
			onError: (errors) => {
				res.status(400).json(errors?.message || errors)
			},
		})
	})
}
