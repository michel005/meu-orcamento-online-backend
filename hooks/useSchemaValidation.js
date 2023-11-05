import { newError } from '../utils/ErrorUtils.js'

/**
 * @param {{
 *     [key: string]: {
 *         mandatory: boolean
 *         type?: 'number'
 *         subSchema?: any
 *     }
 * }} schemaValidation
 */
export const useSchemaValidation = (schemaValidation) => {
	const validate = (valueX, schema = schemaValidation) => {
		const value = JSON.parse(JSON.stringify(valueX))
		const schemaFields = Object.keys(schema)
		const valueFields = Object.keys(value)

		const errors = {}

		const fieldsNotIncludedInSchema = valueFields.filter(
			(field) => !schemaFields.includes(field)
		)
		for (const field of fieldsNotIncludedInSchema) {
			errors[field] = newError('SCHEMA-001')
		}

		for (const field of schemaFields) {
			const fieldDefinition = schema[field]
			if (!valueFields.includes(field) && fieldDefinition.mandatory) {
				errors[field] = newError('SCHEMA-002')
			} else if (
				valueFields.includes(field) &&
				(value[field] === undefined || value[field] === null) &&
				fieldDefinition.mandatory
			) {
				errors[field] = newError('SCHEMA-003')
			} else if (fieldDefinition?.type === 'number') {
				try {
					parseFloat(value[field])
				} catch (_) {
					errors[field] = newError('SCHEMA-004')
				}
			} else if (fieldDefinition.subSchema) {
				if (value[field] && JSON.stringify(value[field]) !== '{}') {
					const validation = validate(value[field], fieldDefinition.subSchema)
					if (validation.hasError) {
						errors[field] = validation.errors
					}
				}
			}
		}
		return {
			hasError: Object.keys(errors).length > 0,
			errors,
		}
	}

	const throwValidation = (value) => {
		const validation = validate(value)
		if (validation.hasError) {
			throw validation.errors
		}
	}

	const parse = (value) => {
		const validValues = {}
		for (const field of Object.keys(schemaValidation)) {
			if (Object.keys(value).includes(field)) {
				validValues[field] = value?.[field]
			} else {
				validValues[field] = undefined
			}
		}
		return validValues
	}

	return {
		validate,
		throwValidation,
		parse,
	}
}
