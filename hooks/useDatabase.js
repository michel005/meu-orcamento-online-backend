import fs from 'fs'

export const useDatabase = (entity) => {
	const getFileContent = () => {
		let fileContent
		try {
			fileContent = fs.readFileSync('./database.json', 'utf-8')
		} catch (error) {
			fileContent = '{}'
		}
		return JSON.parse(fileContent)
	}

	const saveFileContent = (content) => {
		fs.writeFileSync('./database.json', JSON.stringify(content, null, '  '))
	}

	const findAll = () => {
		const fileContent = getFileContent()
		if (!fileContent?.[entity]) {
			return []
		} else {
			return fileContent?.[entity]
		}
	}

	const findOne = ({ query = (x) => true }) => {
		return findAll().find(query)
	}

	const create = ({ value, validate = () => null, onSuccess = () => {}, onError = () => {} }) => {
		try {
			const fileContent = getFileContent()
			const errors = validate(value, {})
			if (errors && Object.keys(errors).length > 0) {
				onError?.(errors)
				return
			}
			value._id = Math.random().toString().split('.')[1]
			const content = {
				...fileContent,
				[entity]: [...findAll(), value],
			}
			saveFileContent(content)
			onSuccess?.(value)
		} catch (error) {
			onError?.(error)
		}
	}

	const update = ({
		id,
		value,
		validate = () => null,
		onSuccess = () => {},
		onError = () => {},
	}) => {
		try {
			const fileContent = getFileContent()
			const errors = validate(value, {})
			if (errors && Object.keys(errors).length > 0) {
				onError?.(errors)
				return
			}
			const changedValue = validate?.(value) || value
			const allValues = findAll().map((x) => {
				if (x._id === id) {
					return changedValue
				} else {
					return x
				}
			})
			const content = {
				...fileContent,
				[entity]: allValues,
			}
			saveFileContent(content)
			onSuccess?.(changedValue)
		} catch (error) {
			onError?.(error)
		}
	}

	const remove = ({ id, onSuccess = () => {}, onError = () => {} }) => {
		try {
			const fileContent = getFileContent()
			const removeIndex = findAll().findIndex((x) => x._id === id)
			const content = {
				...fileContent,
				[entity]: findAll().filter((_, index) => index !== removeIndex),
			}
			saveFileContent(content)
			onSuccess?.()
		} catch (error) {
			onError?.()
		}
	}

	return {
		findAll,
		findOne,
		create,
		update,
		remove,
	}
}
