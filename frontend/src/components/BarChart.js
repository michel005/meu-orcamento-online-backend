import { CurrencyUtils } from 'utils'
import { Icon } from './Icon'
import { BarChartStyle } from 'components'

export const BarChart = ({
	header = 'Exemplo de Gráfico',
	subheader = 'Um gráfico utilizado para exemplificar valores e como eles são exibidos em tela',
	direction = 'horizontal',
	valueFormatter = (value) => CurrencyUtils.format(value),
	data = [
		{ label: <Icon icon="description" />, value: 1200 },
		{ label: <Icon icon="cloud" />, value: 320 },
		{ label: <Icon icon="money" />, value: 500 },
		{ label: <Icon icon="person" />, value: 700 },
		{ label: <Icon icon="favorite" />, value: 800 },
		{ label: <Icon icon="check" />, value: 700 },
	],
}) => {
	const max = data.map((x) => x.value).reduce((x, y) => (x > y ? x : y))

	return (
		<div className={BarChartStyle.barChart}>
			<div className={BarChartStyle.header}>
				<h3>{header}</h3>
				<small>{subheader}</small>
			</div>
			<div className={`${BarChartStyle.barChartValue} ${BarChartStyle[direction]}`}>
				{data.map((d, index) => {
					return (
						<div
							key={index}
							className={BarChartStyle.barItem}
							style={{ '--value': Math.round((d.value * 100) / max) + '%' }}
						>
							<span>{valueFormatter(d.value)}</span>
							<label>{d.label}</label>
						</div>
					)
				})}
			</div>
		</div>
	)
}
