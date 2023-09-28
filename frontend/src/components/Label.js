import LabelStyle from './Label.module.scss'

export { LabelStyle }

export const Label = ({ className, ...props }) => {
	return <div className={`${LabelStyle.label} ${className}`} {...props} />
}
