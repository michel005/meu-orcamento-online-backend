import { useDatabase } from '../hooks/useDatabase.js'

export const useAuthentication = () => {
	const database = useDatabase('user')

	const validate = (token) => {
		if (!token) {
			return false
		}
		return database.findOne({
			query: (x) => x._token === token,
		})
	}

	return {
		validate,
	}
}
