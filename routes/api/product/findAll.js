import { RemoveProductPrivateInformation } from '../../../business/product/RemoveProductPrivateInformation.js'

export const FindAll = (app) => {
	app.get('/api/product', async (req, res) => {
		const allProducts = await req.database.product.findMany({
			user_id: req.user._id,
			customer_id: req.params.customer_id,
		})
		res.status(200).json(allProducts.map((x) => RemoveProductPrivateInformation(x)))
	})
}
