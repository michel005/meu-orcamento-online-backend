import { v4 as uuid } from 'uuid'
import { DateUtils } from '../../utils/DateUtils.js'

export const CreateNewAccessToken = async (database, user, ip) => {
	const expirationDate = new Date()
	expirationDate.setMonth(expirationDate.getMonth() + 1)

	const token = uuid()

	await database.create({
		user_id: user._id,
		date_time: DateUtils.dateTimeToString(new Date()),
		token: token,
		expiration: DateUtils.dateToString(expirationDate),
		ip_address: ip,
	})

	return token
}
