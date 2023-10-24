export const Update = (app) => {
	app.put('/api/customer/:id', (req, res) => {
		res.status(200).json({
			...req.body,
			user_id: undefined,
		})
	})
}
