export const RemoveUserPrivateInformation = (user) => {
	return {
		...user,
		_id: undefined,
		password: undefined,
	}
}
