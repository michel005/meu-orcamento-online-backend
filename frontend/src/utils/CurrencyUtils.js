const CurrencyFormatter = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL',
})

export class CurrencyUtils {
	static format(value) {
		return CurrencyFormatter.format(value)
	}
}
