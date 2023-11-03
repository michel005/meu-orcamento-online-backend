export const RemoveUserPrivateInformation = (user) => {
	return {
		...user,
		id: undefined,
		password: undefined,
	}
}
