import { DateUtils } from './DateUtils'

export class SortUtils {
	static today = DateUtils.dateToString(new Date())

	static sort(x, y, field, direction = 'ASC') {
		if ((x?.[field] || '') > (y?.[field] || '')) return direction === 'ASC' ? 1 : -1
		if ((x?.[field] || '') < (y?.[field] || '')) return direction === 'ASC' ? -1 : 1
		return 0
	}

	static sortDate(x, y, field, direction = 'ASC') {
		if (
			DateUtils.stringToDate(x[field] || SortUtils.today) >
			DateUtils.stringToDate(y[field] || SortUtils.today)
		) {
			return direction === 'ASC' ? 1 : -1
		}
		if (
			DateUtils.stringToDate(x[field] || SortUtils.today) <
			DateUtils.stringToDate(y[field] || SortUtils.today)
		) {
			return direction === 'ASC' ? -1 : 1
		}
		return 0
	}
}
