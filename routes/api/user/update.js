export const Update = (app) => {
	app.put('/api/user', async (req, res) => {
		res.status(200).json({
			...req.user,
			_id: undefined,
			password: undefined,
		})
	})
}
