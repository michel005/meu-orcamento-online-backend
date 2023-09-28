import axios from 'axios'
import { PROJECT_INFO } from 'config/ProjectInfo'
import { PublicRoutes } from 'config/PublicRoutes'
import { ConfigContext, MessageContext, UserContext } from 'hook'
import { NotificationContext } from 'hook/Notification.context'
import { useContext, useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { DateUtils, SortUtils } from 'utils'
import { AcrylicPane } from '../../components/AcrylicPane'
import { ButtonLimitedGroup } from '../../components/ButtonLimitedGroup'
import { Icon } from '../../components/Icon'
import './MainComponent.scss'
import { PrivateRoutes } from 'config/PrivateRoutes'
import { HeaderMenuButton } from 'pages/HeaderMenuButton'

export const MainComponent = () => {
	const { reduced, setReduced, isMobile } = useContext(ConfigContext)
	const { user, clearCurrentUser, privateColorSchema } = useContext(UserContext)
	const { simpleQuestion } = useContext(MessageContext)
	const { notification, removeNotification, closeNotification, clearNotifications } =
		useContext(NotificationContext)

	const [showNotifications, setShowNotifications] = useState(false)
	const [userImageAccessible, setUserImageAccessible] = useState(false)
	const [menuBags, setMenuBags] = useState({})
	const [loadingOptions, setLoadingOptions] = useState({})

	const navigate = useNavigate()

	useEffect(() => {
		if (user?.profileImage) {
			axios.get(user.profileImage).then(() => {
				setUserImageAccessible(true)
			})
		}
	}, [user])

	if (
		Object.keys(PrivateRoutes).filter(
			(menu) => PrivateRoutes[menu].path === window.location.pathname
		).length === 0
	) {
		return
	}

	return (
		<div className={`mainComponent colorSchema${privateColorSchema}`}>
			<header>
				<HeaderMenuButton reduced={reduced} setReduced={setReduced} />
				<div style={{ flexGrow: 1 }} />
				<div className="rightContent">
					<button
						data-icon="notifications"
						data-bag={
							notification.length > 9
								? '+9'
								: notification.length === 0
								? null
								: notification.length
						}
						onClick={() => {
							if (isMobile) {
								setReduced(true)
							}
							setShowNotifications((x) => !x)
						}}
					/>
				</div>
			</header>
			{notification.length > 0 && (
				<div
					className="temporaryNotifications"
					style={showNotifications && !isMobile ? { right: '314px' } : {}}
				>
					{notification
						.filter((x) => !x.displayed)
						.sort((x, y) => SortUtils.numberSort(x.dateTime.getTime(), y.dateTime.getTime(), true))
						.filter((x, index) => index <= 4)
						.map((x, index) => {
							return (
								<div className="notificationBallon" key={index}>
									<div>
										<p>
											{x.icon && <Icon icon={x.icon} style={{ display: 'inline' }} />} {x.message}
										</p>
										<span>{DateUtils.stringDateTime(x.dateTime)}</span>
									</div>
									<button
										className="link closeButton"
										onClick={() => {
											closeNotification(x.id)
										}}
									>
										Fechar
									</button>
								</div>
							)
						})}
				</div>
			)}
			{showNotifications && isMobile && <AcrylicPane onClick={() => setShowNotifications(false)} />}
			{showNotifications && (
				<div className="notifications" style={{ right: 0, animation: 'showRightToLeft 0.25s' }}>
					<h3>
						Notificações ({notification.length})
						<button
							className="link"
							data-icon="close"
							title="Fechar notificações"
							onClick={() => {
								setShowNotifications(false)
							}}
						/>
						<button
							className="link"
							data-icon="clear_all"
							title="Limpar notificações"
							onClick={() => {
								clearNotifications()
							}}
						/>
					</h3>
					<div className="insideNotifications">
						{notification.map((notification) => {
							return (
								<button
									className="transparent"
									data-icon={notification.icon}
									onClick={() => {
										notification.event()
										removeNotification(notification.id)
										if (isMobile) {
											setShowNotifications(false)
										}
									}}
									key={notification.id}
								>
									{notification.message} {DateUtils.stringDateTime(notification.dateTime)}
								</button>
							)
						})}
						{notification.length === 0 && (
							<div className="notFoundContainer">
								<button data-icon="notifications_off" className="transparent notFound" disabled>
									Sem notificações no momento
								</button>
							</div>
						)}
					</div>
				</div>
			)}
			<main>
				{!reduced && isMobile && <AcrylicPane onClick={() => setReduced(true)} />}
				<div className={`mainMenu ${reduced ? 'reduced' : ''}`}>
					<ButtonLimitedGroup
						list={Object.keys(PrivateRoutes).sort((x, y) =>
							SortUtils.numberSort(
								PrivateRoutes[x].order || 99,
								PrivateRoutes[y].order || 99,
								false
							)
						)}
						limit={isMobile ? 99 : 5}
						value={Object.keys(PrivateRoutes).find(
							(option) => PrivateRoutes[option].path === window.location.pathname
						)}
						onChange={(name) => {
							navigate(PrivateRoutes[name].path)
							if (isMobile) {
								setReduced(true)
							}
						}}
						itemIcon={(name) => {
							return PrivateRoutes[name].icon
						}}
						itemClassName="menuButton"
						textModifier={(name) => {
							return PrivateRoutes[name].header
						}}
						itemDefinition={(name) => {
							return {
								bag: loadingOptions[name] ? null : menuBags[name],
								loading: loadingOptions[name],
							}
						}}
					/>
					<div style={{ flexGrow: 1 }} />
					<div className="userInfoAux">
						{userImageAccessible && (
							<img className="profilePicture" alt={user?.fullName} src={user?.profileImage} />
						)}
						<div className="userInfoContent">
							<span className="userName">{user?.fullName}</span>
							<span className="userEmail">{user?.email}</span>
							<div className="userOptions">
								<button
									className="link"
									onClick={() => {
										if (isMobile) {
											setReduced(true)
										}
									}}
								>
									Meu Usuário
								</button>
							</div>
						</div>
					</div>
					<button
						data-icon="dashboard"
						className="menuButton"
						data-loading={false}
						title="Voltar para Início"
						onClick={() => {
							navigate(PublicRoutes.home.path)
						}}
					>
						Voltar para Início
					</button>
					<button
						data-icon="power_settings_new"
						className="menuButton"
						data-loading={false}
						title="Sair"
						onClick={() => {
							simpleQuestion(`Saindo do ${PROJECT_INFO.name}`, 'Deseja realmente sair?', () => {
								clearCurrentUser()
								navigate(PublicRoutes.home.path)
							})
						}}
					>
						Sair
					</button>
				</div>
				<div className="content">
					<Routes>
						{Object.keys(PrivateRoutes).map((option) => {
							const opt = PrivateRoutes[option]
							return <Route key={opt.path} path={opt.path} element={opt.render()} />
						})}
						<Route path="*" element={<h3>404: Página não encontrada</h3>} />
					</Routes>
				</div>
			</main>
		</div>
	)
}
