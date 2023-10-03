export const Login = (app, database) => {
	app.post('/api/user/login', (req, res) => {
		const username = req.body?.username
		const password = req.body?.password
		const findResult = database.findOne({
			query: (x) => (x.username = username && x.password === password),
		})
		if (findResult) {
			res.status(200).json(findResult._token)
		} else {
			res.status(404).send()
		}
	})
}
