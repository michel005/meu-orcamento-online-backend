import { DateUtils } from '../../../utils/DateUtils.js'
import { v4 as uuid } from 'uuid'
import { newError } from '../../../utils/ErrorUtils.js'
import { LoginSchema } from '../../../schema/LoginSchema.js'

export const Login = (app) => {
	app.post('/api/user/login', async (req, res) => {
		const username = req.body?.user_name
		const password = req.body?.password

		const value = {
			user_name: username,
			password: password,
		}

		try {
			LoginSchema.throwValidation(value)
			let findedUser = await req.database.user.findMany(value)
			if (!findedUser?.[0]) {
				findedUser = await req.database.user.findMany(value)
			}

			if (findedUser?.[0]) {
				const expirationDate = new Date()
				expirationDate.setMonth(expirationDate.getMonth() + 1)

				const token = uuid()

				await req.database.user_token.create({
					user_id: findedUser?.[0]._id,
					date_time: DateUtils.dateTimeToString(new Date()),
					token: token,
					expiration: DateUtils.dateToString(expirationDate),
					ip_address: req.ip,
				})

				res.status(200).json({
					...findedUser[0],
					token: token,
					_id: undefined,
				})
			} else {
				res.status(404).json(newError('AUTH-004'))
			}
		} catch (error) {
			res.status(404).json(error || newError('AUTH-005'))
		}
	})
}
