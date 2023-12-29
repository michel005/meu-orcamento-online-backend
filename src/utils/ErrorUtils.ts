import allErrors from '../assets/ErrorCode.json'

export class ErrorUtils {
	static getError = (code: string) => {
		return {
			code,
			message: allErrors?.[code as keyof typeof allErrors],
		}
	}
}
