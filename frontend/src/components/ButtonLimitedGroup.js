import { useEffect, useState } from 'react'

export const ButtonLimitedGroup = ({
	allIcon = 'animation',
	allText = 'Todos',
	showAllOption = false,
	limit = 3,
	list = [],
	itemDefinition = () => ({}),
	itemIcon = () => null,
	itemClassName,
	idModifier = null,
	textModifier = null,
	value,
	onChange = () => null,
}) => {
	const [showMore, setShowMore] = useState(false)
	const [selected, setSelected] = useState(false)

	useEffect(() => {
		setSelected(value)
	}, [value])

	return (
		<div className="buttonLimitedGroup">
			{showAllOption && (
				<button
					data-icon={allIcon}
					className={(!selected ? 'active' : '') + ' ' + itemClassName}
					onClick={() => {
						setSelected(null)
						onChange(null)
					}}
				>
					{allText}
				</button>
			)}
			{list
				.filter((e, index) => showMore === true || index < limit)
				.map((s, index) => {
					return (
						<button
							data-icon={itemIcon(s)}
							data-active={selected === (idModifier ? idModifier(list[index]) : list[index])}
							data-bag={itemDefinition(list[index])?.bag ? itemDefinition(list[index]).bag : null}
							data-loading={
								itemDefinition(list[index])?.loading ? itemDefinition(list[index]).loading : null
							}
							style={
								itemDefinition(list[index])?.iconColor
									? { '--button-icon-color': itemDefinition(list[index])?.iconColor }
									: {}
							}
							key={index}
							className={
								(selected === (idModifier ? idModifier(list[index]) : list[index])
									? 'active'
									: '') +
								' ' +
								itemClassName
							}
							onClick={() => {
								setSelected(idModifier ? idModifier(list[index]) : list[index])
								onChange(list[index])
							}}
						>
							{textModifier ? textModifier(list[index]) : list[index]}
						</button>
					)
				})}
			{list.length > limit && (
				<button
					data-icon={!showMore ? 'expand_more' : 'expand_less'}
					className={itemClassName}
					onClick={() => {
						setShowMore((x) => !x)
					}}
				>
					{showMore ? 'Mostrar Menos' : 'Mostrar Mais'}
				</button>
			)}
		</div>
	)
}
