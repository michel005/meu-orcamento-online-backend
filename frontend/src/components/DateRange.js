import { useRef } from 'react'
import { DateUtils, StringUtils } from 'utils'
import { Field } from './Field'
import { Icon } from './Icon'
import { DateRangeStyle } from 'components'

export const DateRange = ({ value = {}, onChange = () => null }) => {
	const startRef = useRef(null)
	const endRef = useRef(null)

	const valueStart =
		value?.start && value?.start !== '' ? DateUtils.stringToInputDate(value?.start) : ''
	const valueEnd = value?.end && value?.end !== '' ? DateUtils.stringToInputDate(value?.end) : ''

	const dateStart = valueStart !== '' ? DateUtils.stringToDate(value?.start) : null
	const dateEnd = valueEnd !== '' ? DateUtils.stringToDate(value?.end) : null

	return (
		<div className={DateRangeStyle.dateRange}>
			<span className={DateRangeStyle.rangeDescription}>
				<Icon icon="calendar_month" />
				{!dateStart && !dateEnd && (
					<>
						Sem valor, defina uma data de
						<button
							className="link"
							onClick={() => {
								startRef.current.showPicker()
							}}
						>
							início
						</button>
						e/ou
						<button
							className="link"
							onClick={() => {
								endRef.current.showPicker()
							}}
						>
							fim
						</button>
					</>
				)}
				{dateStart && !dateEnd && (
					<>
						A partir de
						<button
							className="link"
							onClick={() => {
								endRef.current.showPicker()
							}}
						>
							{value?.start}.
						</button>
						Definir
						<button
							className="link"
							onClick={() => {
								endRef.current.showPicker()
							}}
						>
							fim
						</button>
					</>
				)}
				{!dateStart && dateEnd && (
					<>
						Até
						<button
							className="link"
							onClick={() => {
								endRef.current.showPicker()
							}}
						>
							{value?.end}.
						</button>
						Definir
						<button
							className="link"
							onClick={() => {
								startRef.current.showPicker()
							}}
						>
							início
						</button>
					</>
				)}
				{dateStart && dateEnd && dateStart.getTime() === dateEnd.getTime() && (
					<>
						Data de hoje. Mudar data
						<button
							className="link"
							onClick={() => {
								startRef.current.showPicker()
							}}
						>
							inicial
						</button>
						e/ou
						<button
							className="link"
							onClick={() => {
								endRef.current.showPicker()
							}}
						>
							final
						</button>
					</>
				)}
				{dateStart && dateEnd && dateStart.getTime() !== dateEnd.getTime() && (
					<>
						{DateUtils.firstDayOfMonth(dateStart).getDate() === dateStart.getDate() &&
						DateUtils.lastDayOfMonth(dateEnd).getDate() === dateEnd.getDate() &&
						dateStart.getMonth() === dateEnd.getMonth() &&
						dateStart.getFullYear() === dateEnd.getFullYear() ? (
							<>
								{dateStart.getMonth() === dateEnd.getMonth() &&
								dateStart.getFullYear() === dateEnd.getFullYear()
									? `${StringUtils.firstUpperCase(
											DateUtils.allMonthValues()[dateStart.getMonth() + 1]
									  )} de ${dateStart.getFullYear()}`
									: ''}
							</>
						) : (
							<>
								De
								<button
									className="link"
									onClick={() => {
										startRef.current.showPicker()
									}}
								>
									{dateStart.getMonth() === dateEnd.getMonth() &&
									dateStart.getFullYear() === dateEnd.getFullYear()
										? dateStart.getDate()
										: value?.start}
								</button>
								até
								<button
									className="link"
									onClick={() => {
										endRef.current.showPicker()
									}}
								>
									{dateStart.getMonth() === dateEnd.getMonth() &&
									dateStart.getFullYear() === dateEnd.getFullYear()
										? dateEnd.getDate()
										: value?.end}
								</button>
								{dateStart.getMonth() === dateEnd.getMonth() &&
								dateStart.getFullYear() === dateEnd.getFullYear()
									? ` de ${
											DateUtils.allMonthValues()[dateStart.getMonth() + 1]
									  } de ${dateStart.getFullYear()}`
									: ''}
							</>
						)}
					</>
				)}
				{(!!value?.start || !!value?.end) && (
					<button
						data-icon="close"
						className="link"
						onClick={() => {
							onChange({
								start: '',
								end: '',
							})
						}}
					/>
				)}
			</span>
			<Field
				fieldClassName={DateRangeStyle.estimateStartDate}
				type="date"
				value={valueStart}
				onChange={(x) => {
					onChange({
						start: x === '' ? '' : DateUtils.inputDateToString(x),
						end: value?.end,
					})
				}}
				max={valueEnd}
				inputRef={startRef}
			/>
			<Field
				fieldClassName={DateRangeStyle.estimateEndDate}
				type="date"
				value={valueEnd}
				onChange={(x) =>
					onChange({
						start: value?.start,
						end: x === '' ? '' : DateUtils.inputDateToString(x),
					})
				}
				min={valueStart}
				inputRef={endRef}
			/>
		</div>
	)
}
