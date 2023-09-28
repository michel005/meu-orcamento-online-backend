import { HelpIconStyle } from 'components'
import { Icon } from './Icon'

export const HelpIcon = ({ helpText, position }) => {
	return (
		<div className={HelpIconStyle.HelpIcon}>
			<Icon className={HelpIconStyle.icon} icon={'help'} />
			<div
				className={`${HelpIconStyle.helpTitle} ${
					position ? HelpIconStyle[`${position}Align`] : ''
				}`}
			>
				{helpText}
			</div>
		</div>
	)
}
