export const Create = (app) => {
	app.post('/api/user', async (req, res) => {
		res.status(200).json({
			...req.body,
			id: undefined,
			password: undefined,
		})
	})
}
