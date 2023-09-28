import { EMPTY_FUNCTION } from 'constants/GeneralConstants'
import { createContext, useEffect, useState } from 'react'
import API from '../config/API'

const UserContext = createContext({
	user: null,
	loading: null,
	publicColorSchema: null,
	privateColorSchema: null,
	isLoggedIn: EMPTY_FUNCTION,
	defineCurrentUser: EMPTY_FUNCTION,
	clearCurrentUser: EMPTY_FUNCTION,
	updateCurrentUser: EMPTY_FUNCTION,
	setLoading: EMPTY_FUNCTION,
	authHeader: EMPTY_FUNCTION,
	setPublicColorSchema: EMPTY_FUNCTION,
	setPrivateColorSchema: EMPTY_FUNCTION,
})

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(false)
	const [publicColorSchema, setPublicColorSchema] = useState('Blue')
	const [privateColorSchema, setPrivateColorSchema] = useState('Blue')

	const isLoggedIn = () => {
		return !!user
	}

	const defineCurrentUser = (userData) => {
		setUser(userData)
		localStorage.setItem('authHeader', userData.authHeader)
	}

	const authHeader = (auth = user.authHeader) => {
		return {
			headers: {
				Authorization: auth,
			},
		}
	}

	const clearCurrentUser = () => {
		setUser(null)
		localStorage.removeItem('authHeader')
	}

	const updateCurrentUser = () => {
		API.get('/user/me', authHeader()).then((response) => {
			defineCurrentUser(response.data)
		})
	}

	useEffect(() => {
		const auth = localStorage.getItem('authHeader')
		if (auth && !user) {
			setLoading(true)
			API.get('/user/me', {
				headers: {
					Authorization: auth,
				},
			})
				.then((response) => {
					defineCurrentUser(response.data)
					setLoading(false)
				})
				.catch(() => {
					clearCurrentUser()
					setLoading(false)
				})
		}
	}, [user, loading])

	return (
		<UserContext.Provider
			value={{
				user,
				loading,
				publicColorSchema,
				privateColorSchema,
				isLoggedIn,
				defineCurrentUser,
				clearCurrentUser,
				updateCurrentUser,
				setLoading,
				authHeader,
				setPublicColorSchema,
				setPrivateColorSchema,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export { UserContext }
