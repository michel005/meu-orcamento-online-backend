export const Create = (app, database) => {
	app.post('/api/user', (req, res) => {
		database.create({
			value: req.body,
			validate: (value, errors) => {
				if (!value?.fullName) {
					errors.fullName = 'Not informed!'
				}
				if (!value?.username) {
					errors.username = 'Not informed!'
				}
				if (!value?.email) {
					errors.email = 'Not informed!'
				}
				if (!value?.password) {
					errors.password = 'Not informed!'
				}
				const findOneUserNameResult = database.findOne({
					query: (x) => (x.username = value?.username),
				})
				if (findOneUserNameResult) {
					errors.username = 'Already existis another user with same user name!'
				}
				const findOneEmailResult = database.findOne({
					query: (x) => (x.email = value?.email),
				})
				if (findOneEmailResult) {
					errors.email = 'Already existis another user with same email!'
				}
				if (Object.keys(errors).length === 0) {
					value._token = Math.random().toString().split('.')[1]
				}
				return errors
			},
			onSuccess: (result) => {
				res.status(200).json({
					...result,
					_id: undefined,
				})
			},
			onError: (errors) => {
				res.status(400).send(errors)
			},
		})
	})
}
