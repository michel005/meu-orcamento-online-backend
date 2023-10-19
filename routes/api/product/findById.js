export const FindById = (app) => {
	app.get('/api/product/:id', async (req, res) => {
		const result = await req.database.product.findMany({
			user_id: req.user._id,
			_id: req.params.id,
		})
		res.status(200).json({
			...result[0],
			user_id: undefined,
		})
	})
}
