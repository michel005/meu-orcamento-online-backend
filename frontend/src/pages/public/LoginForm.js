import {
	CenteredPanel,
	CenteredPanelContent,
	CenteredPanelFooter,
	CenteredPanelHeader,
	FormGroup,
} from 'components'
import API from 'config/API'
import { PublicRoutes } from 'config/PublicRoutes'
import { PrivateRoutes } from 'config/PrivateRoutes'
import { PROJECT_INFO } from 'config/ProjectInfo'
import { MessageContext, UserContext } from 'hook'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginForm.scss'

export const LoginForm = () => {
	const { simpleMessage, errorMessage } = useContext(MessageContext)
	const { defineCurrentUser, loading } = useContext(UserContext)

	const navigate = useNavigate()

	const [loginForm, setLoginForm] = useState({
		userName: localStorage.getItem('recentUser'),
		rememberMe: !!localStorage.getItem('recentUser'),
	})

	const runLogin = () => {
		API.post('/user/login', {
			email: loginForm?.userName || '',
			password: loginForm?.password || '',
		})
			.then((response) => {
				defineCurrentUser(response.data)
				if (loginForm.rememberMe) {
					localStorage.setItem('recentUser', loginForm.userName)
				}
				navigate(PrivateRoutes.dashboard.path)
			})
			.catch((error) => {
				if (error.response.status === 401) {
					simpleMessage({
						header: `Erro ao entrar no ${PROJECT_INFO.description}!`,
						text: 'Usuário e/ou senha inválidos.',
					})
				} else if (error.response.status === 404) {
					simpleMessage({
						header: `Erro ao entrar no ${PROJECT_INFO.description}!`,
						text: 'Usuário não encontrado.',
					})
				} else {
					errorMessage({
						header: 'Erro inesperado ao executar o login!',
						text: error,
					})
				}
			})
	}

	return (
		<CenteredPanel className="loginForm" zIndex={50}>
			<CenteredPanelHeader
				header={
					<>
						Bem vindo ao{' '}
						<b style={{ color: 'var(--ACTIVE_COLOR)', display: 'block', fontSize: '24px' }}>
							{PROJECT_INFO.description}
						</b>
					</>
				}
			/>
			<CenteredPanelContent>
				<FormGroup
					fieldDefinition={{
						userName: {
							label: 'E-mail',
							disabled: loading,
						},
						password: {
							label: 'Senha',
							type: 'password',
							disabled: loading,
							onAction: loginForm.userName && loginForm.password ? runLogin : () => null,
						},
						rememberMe: {
							label: 'Lembrar meu acesso',
							type: 'checkbox',
							validate: (value) => {
								if (!value) {
									localStorage.removeItem('recentUser')
								}
							},
						},
					}}
					value={loginForm}
					onChange={setLoginForm}
					layoutDefinition={(fields) => (
						<>
							{fields.userName}
							{fields.password}
							<div className="rememberAndForgot">
								{fields.rememberMe}
								<button
									className="link"
									onClick={() => {
										navigate('/recoverPassword')
									}}
								>
									Esqueci minha senha
								</button>
							</div>
						</>
					)}
				/>
			</CenteredPanelContent>
			<CenteredPanelFooter>
				<button
					className="transparent"
					onClick={() => {
						navigate(PublicRoutes.createUser.path)
					}}
				>
					Cadastrar-se
				</button>
				<button onClick={runLogin}>Entrar</button>
			</CenteredPanelFooter>
		</CenteredPanel>
	)
}
