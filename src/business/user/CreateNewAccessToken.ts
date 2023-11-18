import { v4 as uuid } from 'uuid'
import { DateUtils } from '../../utils/DateUtils'
import { UserType } from '../../types/User.type'
import { DatabaseType } from '../../types/DatabaseType'
import { Database } from '../../middlewares/databases'

export const CreateNewAccessToken = async ({ currentUser }: { currentUser: UserType }) => {
	const expirationDate = new Date()
	expirationDate.setMonth(expirationDate.getMonth() + 1)

	const token = uuid()

	await Database.user_token.create({
		user_id: currentUser.id as string,
		date_time: DateUtils.dateTimeToString(new Date()),
		token: token,
		expiration: DateUtils.dateToString(expirationDate),
	})

	return token
}
