export class SortUtils {
	static dateSort(date1, date2, asc = true) {
		if (date1.getTime() > date2.getTime()) {
			return asc ? -1 : 1
		}
		if (date1.getTime() < date2.getTime()) {
			return asc ? 1 : -1
		}
		return 0
	}
	static numberSort(number1, number2, asc = true) {
		if (number1 > number2) {
			return asc ? -1 : 1
		}
		if (number1 < number2) {
			return asc ? 1 : -1
		}
		return 0
	}
}
