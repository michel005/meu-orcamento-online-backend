export const Icon = ({ icon, className, ...props }) => {
	return (
		<span {...props} className={`icon ${className || ''}`}>
			{icon}
		</span>
	)
}
