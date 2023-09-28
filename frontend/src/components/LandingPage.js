import { ImageStyle, LandingPageStyle } from 'components'
import { Image } from './Image'

export const LandingPage = ({
	imageHeader,
	imageText,
	imageSrc,
	imageButton,
	secondBlockHeader,
	secondBlockSubheader,
	secondBlockContent,
}) => {
	return (
		<div className={LandingPageStyle.landingPage}>
			<Image src={imageSrc}>
				<h3>{imageHeader}</h3>
				<p>{imageText}</p>
				<div className={ImageStyle.buttons}>{imageButton}</div>
			</Image>
			<div className={LandingPageStyle.colorNegative}>
				<div className={LandingPageStyle.headerSubHeader}>
					<h1>{secondBlockHeader}</h1>
					<p>{secondBlockSubheader}</p>
				</div>
				{secondBlockContent}
			</div>
		</div>
	)
}
