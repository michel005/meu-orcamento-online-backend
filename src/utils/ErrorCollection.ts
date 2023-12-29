import { ErrorUtils } from './ErrorUtils'

export class ErrorCollection {
	allErrors: {
		[key: string]: {
			code: string
			message: string
		}
	} = {}

	constructor(
		otherErrors: {
			[key: string]: {
				code: string
				message: string
			}
		} = {}
	) {
		this.allErrors = otherErrors
	}

	add = (field: string, code: string) => {
		this.allErrors[field] = ErrorUtils.getError(code)
	}

	addConditionally = (condition: boolean, field: string, code: string) => {
		if (condition) {
			this.allErrors[field] = ErrorUtils.getError(code)
		}
	}

	addCustom = (field: string, error: any) => {
		this.allErrors[field] = error
	}

	throw = () => {
		if (Object.keys(this.allErrors).length > 0) {
			throw this.allErrors
		}
	}
}
