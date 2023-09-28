import { AlertStyle } from 'components'
import { Icon } from './Icon'

export const Alert = ({ alert, className, icon = <Icon icon={'warning'} /> }) => {
	return (
		<div className={`${AlertStyle.alert} ${className || ''}`}>
			<div className={AlertStyle.alertIcon}>
				<Icon icon={icon} />
			</div>
			<div className={AlertStyle.alertText}>{alert}</div>
		</div>
	)
}
