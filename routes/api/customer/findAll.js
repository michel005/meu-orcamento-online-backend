export const FindAll = (app) => {
	app.get('/api/customer', (req, res) => {
		const result = req.database.customer.findMany({
			query: (x) => x.user_id === req.user._id,
		})
		res.status(200).json(
			result.map((x) => ({
				...x,
				user_id: undefined,
			}))
		)
	})
}
