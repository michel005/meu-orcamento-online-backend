export const FindById = (app) => {
	app.get('/api/customer/:id', (req, res) => {
		const result = req.database.customer.findOne({
			query: (x) => x.user_id === req.user._id && x._id === req.params.id,
		})
		res.status(200).json({
			...result,
			user_id: undefined,
		})
	})
}
