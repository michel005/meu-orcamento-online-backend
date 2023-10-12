export const FindById = (app) => {
	app.get('/api/customer/:id', async (req, res) => {
		const result = await req.database.customer.findMany({
			user_id: req.user._id,
			_id: req.params.id,
		})
		res.status(200).json({
			...result[0],
			user_id: undefined,
		})
	})
}
