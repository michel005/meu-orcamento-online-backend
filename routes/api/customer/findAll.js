export const FindAll = (app) => {
	app.get('/api/customer', async (req, res) => {
		const person_type = req.query.person_type
		const query = { user_id: req.user._id }
		if (req.query.person_type) {
			query.person_type = person_type
		}
		const result = await req.database.customer.findMany(query)
		res.status(200).json(
			result.map((x) => ({
				...x,
				user_id: undefined,
			}))
		)
	})
}
