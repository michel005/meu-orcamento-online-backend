import { NumberUtils } from './NumberUtils'

export class DateUtils {
	static birthday(birthdayString) {
		return this.birthdayX(new Date(), birthdayString)
	}

	static birthdayX(start, birthdayString) {
		const birthday = this.stringToDate(birthdayString)
		let birthYear = birthday.getFullYear()
		let birthMonth = birthday.getMonth()
		let birthDay = birthday.getDate()
		let today = start
		let currentYear = today.getFullYear()
		let age = currentYear - birthYear
		if (
			today.getMonth() < birthMonth ||
			(today.getMonth() === birthMonth && today.getDate() < birthDay)
		) {
			age--
		}
		return age
	}

	static firstDayOfMonth(date = new Date()) {
		const temp = new Date(date)
		temp.setDate(1)
		return temp
	}

	static dateMinusDay(date = new Date(), val) {
		const temp = new Date(date)
		temp.setDate(date.getDate() - val)
		return temp
	}

	static stringJustDateDefaultFormat(date = new Date()) {
		if (!date) {
			return ''
		}
		return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
			.getDate()
			.toString()
			.padStart(2, '0')}`
	}

	static dateAddDay(date = new Date(), val) {
		const temp = new Date(date)
		temp.setDate(date.getDate() + val)
		return temp
	}

	static lastDayOfMonth(date) {
		const auxDate = new Date(date)
		const currentMonth = auxDate.getMonth()
		let lastDay = auxDate.getDate()

		while (currentMonth === auxDate.getMonth()) {
			auxDate.setDate(auxDate.getDate() + 1)
			if (currentMonth === auxDate.getMonth()) {
				lastDay = auxDate.getDate()
			}
		}
		const temp = new Date(date)
		temp.setDate(lastDay)
		return temp
	}

	static justDate(date = new Date()) {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate())
	}

	static startEndOfWeek(date = new Date()) {
		let tempDate = new Date(date)
		if (tempDate.getDay() > 0) {
			tempDate = this.dateMinusDay(tempDate, tempDate.getDay())
		}

		return {
			start: new Date(tempDate),
			end: this.dateAddDay(tempDate, 6),
		}
	}

	static stringJustDate(date = new Date()) {
		if (!date) {
			return ''
		}
		return (
			date.getDate().toString().padStart(2, '0') +
			'/' +
			(date.getMonth() + 1).toString().padStart(2, '0') +
			'/' +
			date.getFullYear()
		)
	}

	static stringJustTime(date = new Date()) {
		return (
			date.getHours().toString().padStart(2, '0') +
			':' +
			date.getMinutes().toString().padStart(2, '0') +
			':' +
			date.getSeconds().toString().padStart(2, '0')
		)
	}

	static stringDateTime(date = new Date()) {
		return this.stringJustDate(date) + ' ' + this.stringJustTime(date)
	}

	static allMonthValues() {
		let values = {}
		for (let month = 1; month <= 12; month++) {
			let date = new Date(2000, month, 1)
			values[date.getMonth() + 1] = date.toLocaleString('pt-BR', { month: 'long' })
		}
		return values
	}

	static stringToDateTime(date) {
		const auxDate = date.split(' ')[0]
		const day = auxDate.split('/')[0]
		const month = auxDate.split('/')[1]
		const year = auxDate.split('/')[2]
		const auxTime = date.split(' ')[1]
		const hours = auxTime.split(':')[0]
		const minutes = auxTime.split(':')[1]
		const seconds = auxTime.split(':')[2]
		return new Date(
			parseInt(year),
			parseInt(month, 10) - 1,
			parseInt(day),
			parseInt(hours),
			parseInt(minutes),
			parseInt(seconds)
		)
	}

	static stringToDate(auxDate) {
		if (!auxDate) {
			return ''
		}
		const day = auxDate.split('/')[0]
		const month = auxDate.split('/')[1]
		const year = auxDate.split('/')[2]
		return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
	}

	static stringToInputDate(date) {
		return (
			NumberUtils.pad(DateUtils.stringToDate(date).getFullYear(), 2) +
			'-' +
			NumberUtils.pad(DateUtils.stringToDate(date).getMonth() + 1, 2) +
			'-' +
			NumberUtils.pad(DateUtils.stringToDate(date).getDate(), 2)
		)
	}

	static inputDateToString(value) {
		return value.split('-')[2] + '/' + value.split('-')[1] + '/' + value.split('-')[0]
	}
}
