import { EMPTY_FUNCTION } from 'constants/GeneralConstants'
import { createContext, useCallback, useState } from 'react'

export const TableContext = createContext({
	content: [],
	defineContent: EMPTY_FUNCTION,
	filters: [],
	defineFilter: EMPTY_FUNCTION,
})

export const TableProvider = ({ children }) => {
	const [content, setContent] = useState({})
	const defineContent = useCallback((entity, data) => {
		setContent((c) => {
			c[entity] = data
			return { ...c }
		})
	}, [])

	const [filters, setFilters] = useState({})
	const defineFilter = useCallback((entity, prop, value) => {
		setFilters((f) => {
			f[entity][prop] = value
			return {
				...f,
			}
		})
	}, [])

	return (
		<TableContext.Provider
			value={{
				content,
				defineContent,
				filters,
				defineFilter,
			}}
		>
			{children}
		</TableContext.Provider>
	)
}

export default TableProvider
