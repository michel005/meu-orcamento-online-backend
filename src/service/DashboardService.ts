export class DashboardService {
	static daysInMonth = (month: number, year: number) => {
		return new Date(year, month, 0).getDate()
	}
	static sellingByMonth = async (month: number, year: number) => {
		return new Array(
			DashboardService.daysInMonth(new Date().getFullYear(), new Date().getMonth())
		)
			.fill(null)
			.map((_, index) => [`${index + 1}`, Math.round(Math.random() * 100000) / 100])
	}
}
