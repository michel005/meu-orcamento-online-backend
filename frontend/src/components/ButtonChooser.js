import { ButtonChooserStyle } from 'components'

export const ButtonChooser = ({
	label,
	list = {},
	nullable = false,
	nullableText = '',
	value,
	onChange = () => null,
}) => {
	return (
		<div className={ButtonChooserStyle.buttonChooser}>
			{label && <label>{label}</label>}
			<div className={ButtonChooserStyle.values}>
				{nullable && (
					<button className={ButtonChooserStyle.button} onClick={() => onChange(null)}>
						{nullableText}
					</button>
				)}
				{Object.keys(list).map((vl, index) => {
					return (
						<button
							className={ButtonChooserStyle.button}
							data-active={value === vl}
							key={index}
							onClick={() => onChange(vl)}
						>
							{list[vl]}
						</button>
					)
				})}
			</div>
		</div>
	)
}
