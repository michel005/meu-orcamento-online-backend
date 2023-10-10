import { UserSchema } from '../../../schema/UserSchema.js'
import { UserValidation } from '../../../validations/UserValidation.js'

export const Update = (app) => {
	app.put('/api/user', async (req, res) => {
		console.log(req.user)
		try {
			await UserValidation({
				value: {
					...req.user,
					...req.body,
				},
				database: req.database.user,
			})
			const updatedUser = await req.database.user.update(req.user._id, {
				...req.user,
				...req.body,
				email: req.user.email,
				user_name: req.user.user_name,
			})
			res.status(200).json({
				...updatedUser,
				_id: undefined,
				password: undefined,
			})
		} catch (error) {
			console.log({ error })
			res.status(400).json(error)
		}
	})
}
