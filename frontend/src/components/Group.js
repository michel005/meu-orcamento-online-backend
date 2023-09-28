import { GroupStyle } from 'components'

export const Group = ({ children, header, ...props }) => {
	return (
		<div className={GroupStyle.group} {...props}>
			{!!header && <div className={GroupStyle.title}>{header}</div>}
			<div className={GroupStyle.groupContent}>{children}</div>
		</div>
	)
}
