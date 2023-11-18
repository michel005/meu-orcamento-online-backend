import { CreateNewAccessToken } from './CreateNewAccessToken'
import { RemoveUserPrivateInformation } from './RemoveUserPrivateInformation'
import { newError } from '../../utils/ErrorUtils'
import { GetUrlByTypeAndIdentifier } from '../files/GetUrlByTypeAndIdentifier'
import { Database } from '../../middlewares/databases'

export const LoginUserWithUserNameAndPassword = async ({
	userName,
	password,
}: {
	userName: string
	password: string
}) => {
	const userFound = await Database.user.findMany({
		user_name: userName,
		password: password,
	})

	const user = userFound?.[0]
	if (user) {
		const newToken = await CreateNewAccessToken({
			currentUser: user,
		})

		return {
			user: RemoveUserPrivateInformation({
				...user,
				address: undefined,
				picture: GetUrlByTypeAndIdentifier('user', user.id as string, user.id as string),
			}),
			address: user.address,
			token: newToken,
		}
	} else {
		throw newError('AUTH-004')
	}
}
