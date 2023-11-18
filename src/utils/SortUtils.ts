import { DateUtils } from './DateUtils'

export class SortUtils {
	static today: string = DateUtils.dateToString(new Date())

	static sort<T>(x: T, y: T, field: string, direction: 'ASC' | 'DESC' = 'ASC') {
		if ((x?.[field as keyof typeof x] || '') > (y?.[field as keyof typeof y] || ''))
			return direction === 'ASC' ? 1 : -1
		if ((x?.[field as keyof typeof x] || '') < (y?.[field as keyof typeof y] || ''))
			return direction === 'ASC' ? -1 : 1
		return 0
	}

	static sortDate(x: any, y: any, field: string, direction: 'ASC' | 'DESC' = 'ASC') {
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
