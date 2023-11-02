export const RemoveProductPrivateInformation = (product) => {
	return {
		...product,
		user_id: undefined,
	}
}
