import { Image, ImageStyle } from 'components'
import HomePageStyle from './HomePage.module.scss'
import { Assets } from 'assets/Assets'

export { HomePageStyle }

export const HomePage = () => {
	return (
		<div className={HomePageStyle.homePage}>
			<Image src={Assets.carro_landscape}>
				<h3>O seu template de desenvolvimento</h3>
				<p>Aqui você da seu ponta pé inicial em um novo projeto de forma rápida.</p>
				<div className={ImageStyle.buttons}>
					<button data-icon="start">Iniciar Agora</button>
				</div>
			</Image>
		</div>
	)
}
