export const RemoveCustomerPrivateInformation = (customer) => {
	return {
		...customer,
		user_id: undefined,
	}
}
