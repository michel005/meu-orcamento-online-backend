export class TimeUtils {
	static timeToNumber(time) {
		if (!time) {
			return 0
		}
		let parts = time.split(':')
		return parseInt(parts[0]) * 60 * 60 + parseInt(parts[1])
	}
}
