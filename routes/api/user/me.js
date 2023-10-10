export const Me = (app, database) => {
	app.post('/api/user/me', (req, res) => {
		res.status(200).json({
			...req.user,
			_id: undefined,
			password: undefined,
		})
	})
}
