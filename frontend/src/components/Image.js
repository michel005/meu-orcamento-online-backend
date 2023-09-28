import { ImageStyle } from 'components'
import { Icon } from './Icon'

export const Image = ({ src, children, className }) => {
	return (
		<div className={ImageStyle.imageWithContentInside}>
			<img src={src} alt={<Icon icon="picture" />} />
			<div className={ImageStyle.content}>{children}</div>
		</div>
	)
}
