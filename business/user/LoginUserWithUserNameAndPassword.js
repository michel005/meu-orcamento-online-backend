import { CreateNewAccessToken } from './CreateNewAccessToken.js'
import { RemoveUserPrivateInformation } from './RemoveUserPrivateInformation.js'
import { newError } from '../../utils/ErrorUtils.js'
import { GetFileByTypeAndIdentifier } from '../files/GetFileByTypeAndIdentifier.js'
import { GetUrlByTypeAndIdentifier } from '../files/GetUrlByTypeAndIdentifier.js'

export const LoginUserWithUserNameAndPassword = async (databases, username, password) => {
	const findedUser = await databases.user.findMany({
		user_name: username,
		password: password,
	})

	const logedUser = findedUser?.[0]
	if (logedUser) {
		const newToken = await CreateNewAccessToken(databases.user_token, logedUser)

		return {
			user: RemoveUserPrivateInformation({
				...logedUser,
				address: undefined,
				picture: GetUrlByTypeAndIdentifier('user', findedUser[0].id),
			}),
			address: logedUser.address,
			token: newToken,
		}
	} else {
		throw newError('AUTH-004')
	}
}
