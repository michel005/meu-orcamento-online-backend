import { FieldStyle } from 'components'
import { HelpIcon } from './HelpIcon'

export const Field = ({
	label,
	type,
	value,
	disabled,
	help,
	helpPosition,
	inputClassName,
	onFocus = () => null,
	onBlur = () => null,
	placeholder,
	onChange,
	error,
	icon,
	iconEvent,
	onAction = () => null,
	onEscape = () => null,
	inputRef,
	fieldClassName,
	...props
}) => {
	return (
		<div className={`${FieldStyle.field} ${fieldClassName}`}>
			{!!label && (
				<label>
					{label} {help && <HelpIcon helpText={help} position={helpPosition} />}
				</label>
			)}
			{type === 'area' && (
				<textarea
					tabIndex={100}
					placeholder={placeholder}
					type={type}
					value={type === 'file' ? value || '' : value}
					disabled={disabled}
					className={inputClassName || ''}
					onBlur={(e) => onBlur(e.target.value)}
					onFocus={(e) => onFocus(e.target.value)}
					onChange={(e) => onChange(type === 'file' ? e : e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Escape') {
							onEscape()
						}
						if (e.key === 'Enter') {
							onAction()
						}
					}}
					ref={inputRef}
					{...props}
				/>
			)}
			{type !== 'area' && (
				<input
					tabIndex={100}
					placeholder={placeholder}
					type={type}
					value={type === 'file' ? value || '' : value}
					disabled={disabled}
					className={inputClassName || ''}
					onBlur={(e) => onBlur(e.target.value)}
					onFocus={(e) => onFocus(e.target.value)}
					onChange={(e) => onChange(type === 'file' ? e : e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Escape') {
							onEscape()
						}
						if (e.key === 'Enter') {
							onAction()
						}
					}}
					ref={inputRef}
					{...props}
				/>
			)}
			{!!error && <span className={FieldStyle.error}>{error}</span>}
		</div>
	)
}
