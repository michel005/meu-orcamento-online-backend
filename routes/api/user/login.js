import { DateUtils } from '../../../utils/DateUtils.js'
import { v4 as uuid } from 'uuid'
import { ObjectId } from 'mongodb'
import { newError } from '../../../utils/ErrorUtils.js'

export const Login = (app) => {
	app.post('/api/user/login', async (req, res) => {
		const username = req.body?.user_name
		const password = req.body?.password

		try {
			const findedUser = await req.database.user.findMany({
				user_name: username,
				password: password,
			})

			if (findedUser?.[0]) {
				const expirationDate = new Date()
				expirationDate.setMonth(expirationDate.getMonth() + 1)

				const token = uuid()

				await req.database.user_token.create({
					user_id: new ObjectId(findedUser?.[0]._id),
					date_time: DateUtils.dateTimeToString(new Date()),
					token: token,
					expiration: DateUtils.dateToString(expirationDate),
					ip_address: req.ip,
				})

				res.status(200).json({
					...findedUser[0],
					token: token,
				})
			} else {
				res.status(404).json(newError('AUTH-004'))
			}
		} catch (error) {
			res.status(404).json(newError('AUTH-004'))
		}
	})
}
