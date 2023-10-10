export class DateUtils {
	static dateToString = (date) => {
		return date?.toLocaleDateString?.('pt-BR') || ''
	}

	static timeToString = (date) => {
		return date?.toLocaleTimeString?.('pt-BR') || ''
	}

	static dateTimeToString = (date) => {
		return date?.toLocaleString?.('pt-BR') || ''
	}

	static stringToDate = (date) => {
		let temp = date.split('/')
		return new Date(parseInt(temp[2]), parseInt(temp[1]) - 1, parseInt(temp[0]))
	}

	static stringToDateTime = (date) => {
		let tempDate = date.split(' ')[0].split('/')
		let tempTime = date.split(' ')[0].split(':')
		return new Date(
			parseInt(tempDate[2]),
			parseInt(tempDate[1]) - 1,
			parseInt(tempDate[0]),
			parseInt(tempTime[0]),
			parseInt(tempTime[1]),
			parseInt(tempTime[2])
		)
	}

	static betweenString = (value, start, end) => {
		return DateUtils.between(
			DateUtils.stringToDate(value),
			DateUtils.stringToDate(start),
			DateUtils.stringToDate(end)
		)
	}

	static between = (value, start, end) => {
		return value >= start && value <= end
	}

	static daysBetween = (data1, data2) => {
		const date1 = DateUtils.stringToDate(data1)
		const date2 = DateUtils.stringToDate(data2)
		const diffEmMilissegundos = date1.getTime() - date2.getTime()
		const diffEmDias = Math.floor(diffEmMilissegundos / (1000 * 60 * 60 * 24))

		return diffEmDias + 1
	}

	static stringToInputDate(date) {
		return (
			DateUtils.stringToDate(date).getFullYear().toString().padStart(4, '0') +
			'-' +
			(DateUtils.stringToDate(date).getMonth() + 1).toString().padStart(2, '0') +
			'-' +
			DateUtils.stringToDate(date).getDate().toString().padStart(2, '0')
		)
	}

	static inputDateToString(value) {
		return value.split('-')[2] + '/' + value.split('-')[1] + '/' + value.split('-')[0]
	}
}
