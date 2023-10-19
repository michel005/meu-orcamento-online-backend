import { DateUtils } from '../../../utils/DateUtils.js'
import { ProductValidation } from '../../../validations/ProductValidation.js'
import QRCode from 'qrcode'

export const Create = (app) => {
	app.post('/api/product', async (req, res) => {
		try {
			const value = {
				...req.body,
				created: DateUtils.dateTimeToString(new Date()),
				updated: undefined,
				user_id: req.user._id,
			}
			await ProductValidation({
				value,
				database: req.database.product,
			})

			value.qrcode = await QRCode.toString(
				`http://localhost/productsSearch?code=${value.code}`,
				{
					errorCorrectionLevel: 'H',
					type: 'svg',
				}
			)
			const response = await req.database.product.create(value)
			res.status(200).json({
				...response,
				user_id: undefined,
			})
		} catch (error) {
			res.status(400).json(error)
		}
	})
}
