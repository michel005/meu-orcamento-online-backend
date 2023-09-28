import { AcrylicPane } from 'components'
import { PrivateRoutes } from 'config/PrivateRoutes'
import { PublicRoutes } from 'config/PublicRoutes'
import { MessageContext, UserContext } from 'hook'
import { HeaderMenuButton } from 'pages/HeaderMenuButton'
import { useContext, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './MainLandingPage.scss'

export const MainLandingPage = () => {
	const isMobile = useMediaQuery({ query: '(max-width: 1000px)' })
	const { user, isLoggedIn, clearCurrentUser } = useContext(UserContext)
	const { simpleQuestion } = useContext(MessageContext)

	const [reduced, setReduced] = useState(true)
	const navigate = useNavigate()

	if (
		Object.keys(PublicRoutes).filter((menu) => PublicRoutes[menu].path === window.location.pathname)
			.length === 0
	) {
		return
	}

	const loginPath = [
		PublicRoutes.login.path,
		PublicRoutes.createUser.path,
		PublicRoutes.recoverPassword.path,
	].includes(window.location.pathname)

	return (
		<div className="mainLandingPage">
			{isMobile && !reduced && <AcrylicPane onClick={() => setReduced(true)} />}
			<header>
				<HeaderMenuButton reduced={reduced} setReduced={setReduced} showReduced={isMobile} />
				<div className="headerOptions" data-reduced={reduced}>
					{Object.keys(PublicRoutes)
						.filter((option) =>
							PublicRoutes[option].show === undefined ? true : PublicRoutes[option].show
						)
						.map((option, optionIndex) => {
							const opt = PublicRoutes[option]
							return (
								<button
									key={optionIndex}
									className={`${opt.className} ${
										window.location.pathname === opt.path ? 'active' : ''
									}`}
									data-icon={opt.icon}
									onClick={() => {
										navigate(opt.path)
										setReduced(true)
									}}
								>
									{opt.header}
								</button>
							)
						})}
				</div>
				<div className="userOptions">
					<div>
						{isLoggedIn() ? (
							<>
								<button
									className="loginButton"
									onClick={() => navigate(PrivateRoutes.dashboard.path)}
								>
									{user?.fullName.split(' ')[0].trim()}
								</button>
								<button
									data-icon="power_settings_new"
									onClick={() => {
										simpleQuestion(
											`Deseja realmente sair do usuário ${user?.fullName}?`,
											'',
											() => {
												clearCurrentUser()
											}
										)
									}}
								/>
							</>
						) : (
							<button
								className="loginButton"
								data-icon={loginPath ? 'home' : 'person'}
								onClick={() => {
									if (loginPath) {
										navigate(PublicRoutes.home.path)
									} else {
										navigate(PublicRoutes.login.path)
									}
									setReduced(true)
								}}
							>
								{loginPath ? 'Voltar' : 'Entrar / Cadastrar-se'}
							</button>
						)}
					</div>
				</div>
			</header>
			<main>
				<Routes>
					{Object.keys(PublicRoutes).map((option, optionIndex) => {
						const opt = PublicRoutes[option]
						return <Route key={optionIndex} path={opt.path} element={opt.render()} />
					})}
					<Route path="*" element={<h3>404: Not found</h3>} />
				</Routes>
			</main>
		</div>
	)
}
