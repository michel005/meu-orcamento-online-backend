import { PROJECT_INFO } from 'config/ProjectInfo'
import './HeaderMenuButton.scss'
import { useContext } from 'react'
import { ConfigContext } from 'hook'

export const HeaderMenuButton = ({
	reduced,
	setReduced,
	showReduced = true,
	hideNameWhenResponsive = false,
}) => {
	const { isMobile } = useContext(ConfigContext)

	return (
		<div
			className="headerMenuButton"
			data-reduced={reduced && showReduced}
			data-show-reduced={showReduced}
		>
			<div className="headerMenuCentered">
				<button
					data-icon={PROJECT_INFO.header.icon}
					className="projectLogo"
					onClick={() => {
						setReduced((x) => !x)
					}}
				>
					{(!hideNameWhenResponsive || !isMobile) && <span>{PROJECT_INFO.header.text}</span>}
				</button>
			</div>
		</div>
	)
}
