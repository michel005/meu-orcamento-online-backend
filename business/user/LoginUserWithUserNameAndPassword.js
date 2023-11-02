import { CreateNewAccessToken } from './CreateNewAccessToken.js'
import { RemoveUserPrivateInformation } from './RemoveUserPrivateInformation.js'
import { newError } from '../../utils/ErrorUtils.js'

export const LoginUserWithUserNameAndPassword = async (
	database,
	tokenDatabase,
	username,
	password,
	ip
) => {
	const findedUser = await database.findMany({
		user_name: username,
		password: password,
	})

	const logedUser = findedUser?.[0]
	if (logedUser) {
		const newToken = await CreateNewAccessToken(tokenDatabase, logedUser, ip)

		return {
			...RemoveUserPrivateInformation(logedUser),
			token: newToken,
		}
	} else {
		throw newError('AUTH-004')
	}
}
