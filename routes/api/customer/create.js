export const Create = (app) => {
	app.post('/api/customer', (req, res) => {
		res.status(200).json({
			...req.body,
			user_id: undefined,
		})
	})
}
