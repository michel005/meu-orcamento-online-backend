import { ErrorCode } from '../const/ErrorCode'

export const newError = (error: any) => {
	if (ErrorCode?.[error as string]) {
		return {
			code: error,
			message: ErrorCode[error],
		}
	} else {
		return {
			code: error.code,
			message: error.message,
		}
	}
}
