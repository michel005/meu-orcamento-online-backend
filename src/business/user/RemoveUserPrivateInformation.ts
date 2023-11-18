import { UserType } from '../../types/User.type'

export const RemoveUserPrivateInformation = (user: UserType) => {
	return {
		...user,
		id: undefined,
		password: undefined,
	}
}
