import { useContext, useEffect, useState } from 'react'
import { ConfigContext } from '../hook/Config.context'
import { DateUtils } from '../utils'
import { Icon } from './Icon'
import { Loading } from './Loading'
import { TableStyle } from 'components'

export const Table = ({
	header = {},
	responsiveHeader = {},
	columnDefinition = {},
	rowDefinition = (row) => null,
	valueModifier = {},
	sortModifier = {},
	data = [],
	filter = () => true,
	footer = [],
	initialSort = {},
	onSortChange = (sort) => null,
	onClick = (row) => null,
	noDataFoundMessage = null,
	usePagination = false,
	disabled = false,
	defaultPageSize = 10,
	sizeRange = [10, 20, 50, 100],
	loading = false,
}) => {
	const { isMobile } = useContext(ConfigContext)
	const [currentPage, setCurrentPage] = useState(1)
	const [pageSize, setPageSize] = useState(defaultPageSize)

	const dataLength = data.filter(filter).length
	const pageLength =
		dataLength === 0
			? 1
			: dataLength % pageSize < pageSize / 2 && dataLength % pageSize !== 0
			? Math.round(dataLength / pageSize) + 1
			: Math.round(dataLength / pageSize)

	const headerFields = Object.keys(isMobile && !!responsiveHeader ? responsiveHeader : header)
	const [sort, setSort] = useState({
		field: initialSort?.field || headerFields[0],
		direction: initialSort?.direction || 'ASC',
	})
	const [loaded, setLoaded] = useState(false)
	const [hover, setHover] = useState(undefined)

	const sortColumnDef = columnDefinition?.[sort.field] || {}
	const sortColumnType = sortColumnDef?.columnType || 'text'

	const handleValueToSort = (x, y) => {
		let modifierX = valueModifier?.[sort.field]
		let modifierY = valueModifier?.[sort.field]
		let sortModifierX = sortModifier?.[sort.field]
		let sortModifierY = sortModifier?.[sort.field]
		let valueX = sortModifierX ? sortModifierX(x) : modifierX ? modifierX(x) : x[sort.field]
		let valueY = sortModifierY ? sortModifierY(y) : modifierY ? modifierY(y) : y[sort.field]
		return {
			valueX,
			valueY,
		}
	}

	const paginationFilter = (x, i) => {
		if (usePagination) {
			let coef = (currentPage - 1) * pageSize
			return i >= coef && i < coef + pageSize
		} else {
			return true
		}
	}

	let sortFunction = (x, y) => {
		const { valueX, valueY } = handleValueToSort(x, y)

		let finalSort = 0
		if ((valueX || '') > (valueY || '')) {
			finalSort = 1
		}
		if ((valueX || '') < (valueY || '')) {
			finalSort = -1
		}
		return sort.direction === 'DESC' ? finalSort : finalSort * -1
	}
	if (sortColumnType === 'date') {
		sortFunction = (x, y) => {
			const { valueX, valueY } = handleValueToSort(x, y)

			let dateX = !!valueX ? DateUtils.stringToDate(valueX).getTime() : 0
			let dateY = !!valueY ? DateUtils.stringToDate(valueY).getTime() : 0

			let finalSort = 0
			if (dateX > dateY) {
				finalSort = 1
			}
			if (dateX < dateY) {
				finalSort = -1
			}
			return sort.direction === 'DESC' ? finalSort : finalSort * -1
		}
	}

	useEffect(() => {
		if (loaded) {
			onSortChange(sort)
		}
	}, [sort, loaded, onSortChange])

	useEffect(() => {
		if (!loaded) {
			setSort(initialSort)
			setLoaded(true)
		}
	}, [loaded, initialSort])

	return (
		<table className={`${TableStyle.table} ${disabled ? 'disabled' : ''}`}>
			<thead>
				<tr>
					{headerFields.map((field, index) => {
						let columnDef = columnDefinition?.[field] || {}
						return (
							<th
								onClick={() => {
									setSort((s) => {
										return {
											field: field,
											direction:
												s.field === field ? (s.direction === 'ASC' ? 'DESC' : 'ASC') : 'ASC',
										}
									})
								}}
								onMouseEnter={() => {
									setHover(field)
								}}
								onMouseLeave={() => {
									setHover(undefined)
								}}
								className={`${field}_column ${TableStyle[columnDef.classNameHeader] || ''} ${
									hover === field ? TableStyle.hover : ''
								}`}
								key={index}
							>
								{sort.field === field && (
									<Icon icon={sort.direction === 'ASC' ? 'expand_more' : 'expand_less'} />
								)}{' '}
								{header[field]}
							</th>
						)
					})}
				</tr>
			</thead>
			<tbody>
				{loading && <Loading />}
				{data
					.sort(sortFunction)
					.filter(paginationFilter)
					.filter(filter)
					.map((row, rowIndex) => {
						const definition = rowDefinition(row)

						const classNameRow = definition?.className
						let allClasses = []
						if (classNameRow) {
							allClasses = classNameRow.split(' ')
						}

						return (
							<tr
								key={rowIndex}
								onDoubleClick={(e) => {
									e.persist()
									onClick(row, rowIndex)
								}}
								className={allClasses.map((cl) => TableStyle[cl])}
								style={loaded ? {} : { animation: 'none' }}
							>
								{headerFields.map((field, fieldIndex) => {
									let columnDef = columnDefinition?.[field] || {}
									let modifier = valueModifier?.[field] || (() => row[field])
									return (
										<td
											className={`${field}_column ${TableStyle[columnDef.classNameBody] || ''} ${
												hover === field ? TableStyle.hover : ''
											}`}
											key={fieldIndex}
										>
											{modifier ? modifier(row, rowIndex) : row[field]}
										</td>
									)
								})}
							</tr>
						)
					})}
				{data.filter(filter).length === 0 && (
					<tr className={TableStyle.noData}>
						<td colSpan={headerFields.length}>{noDataFoundMessage || 'Nenhum dado encontrado'}</td>
					</tr>
				)}
			</tbody>
			<tfoot>
				{footer}
				{usePagination && (
					<>
						<tr className={TableStyle.pagination}>
							<td colSpan={headerFields.length}>
								<div className={TableStyle.paginationRow}>
									<div className={TableStyle.pageList}>
										<div className={TableStyle.insidePageList}>
											{new Array(pageLength).fill(null).map((value, index) => {
												return (
													<div key={index} className={TableStyle.pageButtonCOntainer}>
														<button
															className={index + 1 === currentPage ? '' : TableStyle.transparent}
															onClick={() => {
																setCurrentPage(index + 1)
															}}
														>
															{index + 1}
														</button>
													</div>
												)
											})}
										</div>
									</div>
									<button
										data-icon="navigate_before"
										disabled={currentPage === 1}
										className={TableStyle.back}
										onClick={() => {
											setCurrentPage((x) => {
												x = x - 1
												return x
											})
										}}
									/>
									<button
										data-icon="navigate_next"
										disabled={currentPage === pageLength}
										className={TableStyle.next}
										onClick={() => {
											setCurrentPage((x) => {
												x = x + 1
												return x
											})
										}}
									/>
								</div>
								{data.filter(paginationFilter).length === data.length
									? `Mostrando ${data.filter(filter).filter(paginationFilter).length} registro(s)`
									: `Mostrando ${
											data.filter(filter).filter(paginationFilter).length
									  } de ${dataLength} registro(s)`}
								<div className={TableStyle.pageSize}>
									Tamanho da página
									<select
										value={pageSize}
										onChange={(x) => {
											setCurrentPage(1)
											setPageSize(parseInt(x.target.value))
										}}
									>
										{sizeRange.map((value) => (
											<option key={value} value={value}>
												{value}
											</option>
										))}
									</select>
								</div>
							</td>
						</tr>
					</>
				)}
			</tfoot>
		</table>
	)
}
