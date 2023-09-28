import { EMPTY_FUNCTION } from 'constants/GeneralConstants'
import { createContext, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

const ConfigContext = createContext({
	isMobile: false,
	reduced: false,
	setReduced: EMPTY_FUNCTION,
	showForm: EMPTY_FUNCTION,
	defineShowForm: EMPTY_FUNCTION,
	closeAllForms: EMPTY_FUNCTION,
	loading: {},
	load: EMPTY_FUNCTION,
})

export const ConfigProvider = ({ children }) => {
	const [showForm, setShowForm] = useState({})
	const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
	const [reduced, setReduced] = useState(isMobile)
	const [loading, setLoading] = useState({})

	const load = (entity, value = true) => {
		setLoading((l) => {
			l[entity] = value
			return { ...l }
		})
	}

	const defineShowForm = (form, value) => {
		setShowForm((sf) => {
			sf[form] = structuredClone(value)
			return {
				...sf,
			}
		})
	}

	const closeAllForms = () => {
		setShowForm({})
	}

	return (
		<ConfigContext.Provider
			value={{
				isMobile,
				reduced,
				setReduced,
				showForm,
				defineShowForm,
				closeAllForms,
				loading,
				load,
			}}
		>
			{children}
		</ConfigContext.Provider>
	)
}

export { ConfigContext }
