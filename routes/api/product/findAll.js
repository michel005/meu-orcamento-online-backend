export const FindAll = (app) => {
	app.get('/api/product', async (req, res) => {
		let query = { user_id: req.user._id }
		if (req.query.search && req.query.search !== '') {
			query = {
				$and: [
					{ user_id: req.user._id },
					{
						$or: [
							{ code: { $regex: `.*${req.query.search}.*`, $options: 'i' } },
							{ name: { $regex: `.*${req.query.search}.*`, $options: 'i' } },
							{ description: { $regex: `.*${req.query.search}.*`, $options: 'i' } },
							{ categories: { $regex: `.*${req.query.search}.*`, $options: 'i' } },
							{ hashtags: { $regex: `.*${req.query.search}.*`, $options: 'i' } },
						],
					},
				],
			}
		}
		const result = await req.database.product.findMany(query)
		res.status(200).json(
			result.map((x) => ({
				...x,
				user_id: undefined,
			}))
		)
	})
}
