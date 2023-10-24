export const Me = (app) => {
	app.post('/api/user/me', (req, res) => {
		res.status(200).json({
			...req.user,
			_id: undefined,
			password: undefined,
		})
	})
}
