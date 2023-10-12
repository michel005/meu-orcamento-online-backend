import { DateUtils } from '../../../utils/DateUtils.js'
import { CustomerValidation } from '../../../validations/CustomerValidation.js'

export const Delete = (app) => {
	app.delete('/api/customer/:id', (req, res) => {
		req.database.customer.remove(req.params.id)
		res.status(200).send()
	})
}
