export const FindAll = (app) => {
	app.get('/api/customer', async (req, res) => {
		const result = await req.database.customer.findMany({ user_id: req.user._id })
		res.status(200).json(
			result.map((x) => ({
				...x,
				user_id: undefined,
			}))
		)
	})
}
