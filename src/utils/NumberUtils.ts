export class NumberUtils {
	static numberToCurrency = (value: number) => {
		if (value === undefined) {
			return null
		}
		return (value / 100).toLocaleString('pt-br', {
			style: 'currency',
			currency: 'BRL',
		})
	}
}