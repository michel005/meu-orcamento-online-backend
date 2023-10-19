import { DateUtils } from '../../../utils/DateUtils.js'
import { CustomerValidation } from '../../../validations/CustomerValidation.js'

export const Delete = (app) => {
	app.delete('/api/product/:id', (req, res) => {
		req.database.product.remove(req.params.id)
		res.status(200).send()
	})
}
