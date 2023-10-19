import { DateUtils } from '../../../utils/DateUtils.js'
import { ProductValidation } from '../../../validations/ProductValidation.js'
import QRCode from 'qrcode'

export const Update = (app) => {
	app.put('/api/product/:id', async (req, res) => {
		try {
			const findedProduct = (
				await req.database.product.findMany({
					_id: req.params.id,
					user_id: req.user._id,
				})
			)?.[0]
			const value = {
				...findedProduct,
				...req.body,
				updated: DateUtils.dateTimeToString(new Date()),
				created: findedProduct.created,
				_id: findedProduct._id,
				user_id: findedProduct.user_id,
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
			const response = await req.database.product.update(req.params.id, value)
			res.status(200).json({
				...response,
				user_id: undefined,
			})
		} catch (error) {
			res.status(400).json(error)
		}
	})
}
