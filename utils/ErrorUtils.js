import { ErrorCode } from '../const/ErrorCode.js'

export const newError = (error) => {
	if (ErrorCode?.[error]) {
		return {
			code: error,
			message: ErrorCode[error],
		}
	} else {
		return {
			code: error,
			message: error.message,
		}
	}
}
