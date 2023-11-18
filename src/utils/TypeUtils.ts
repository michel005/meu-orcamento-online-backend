export class TypeUtils {
	static isJSON = (value: any) => {
		try {
			JSON.parse(value)
			return true
		} catch (error) {
			return false
		}
	}
}
