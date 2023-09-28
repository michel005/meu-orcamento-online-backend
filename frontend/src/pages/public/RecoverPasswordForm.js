import {
	CenteredPanel,
	CenteredPanelContent,
	CenteredPanelFooter,
	CenteredPanelHeader,
	FormGroup,
} from 'components'
import API from 'config/API'
import { PublicRoutes } from 'config/PublicRoutes'
import { ConfigContext, MessageContext } from 'hook'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const RecoverPasswordForm = ({ onClose }) => {
	const { load, loading } = useContext(ConfigContext)
	const { simpleMessage, errorMessage } = useContext(MessageContext)

	const navigate = useNavigate()

	const [recoverForm, setRecoverForm] = useState({
		email: '',
		recoverCode: '',
		requestUserRecoverCode: false,
		validated: false,
		newPassword: '',
		newPasswordConfirm: '',
		loading: false,
	})

	const nextStep = () => {
		if (!recoverForm.requestUserRecoverCode) {
			load('recoverPasswordStep')
			API.post(`/user/recoverPassword?email=${recoverForm.email}`)
				.then(() => {
					setRecoverForm((y) => {
						y.requestUserRecoverCode = true
						return { ...y }
					})
					simpleMessage({
						header: 'Código de recuperação enviado por e-mail!',
						text: 'Enviamos no seu e-mail um código composto de 9 números, que você deve informar aqui neste formulário.',
					})
				})
				.catch((response) => {
					if (response.response.status === 404) {
						simpleMessage({
							header: 'E-mail não encontrado!',
							text: 'Este e-mail não esta sendo utilizado por uma conta.',
						})
					} else {
						errorMessage({
							header: 'Erro ao recuperar senha!',
							text: response,
						})
					}
				})
				.finally(() => {
					load('recoverPasswordStep', false)
				})
		} else if (!recoverForm.validated) {
			load('recoverPasswordStep')
			API.post(
				`/user/validateRecoverCode?email=${recoverForm?.email || ''}&recoverCode=${
					recoverForm?.recoverCode || ''
				}`
			)
				.then(() => {
					setRecoverForm((y) => {
						y.validated = true
						return { ...y }
					})
					simpleMessage({
						header: 'Ultima etapa para recuperar o seu acesso!',
						text: 'Conseguimos confirmar que você é o dono da conta. Agora informe a nova senha seguindo os padrões de segurança.',
					})
				})
				.catch((response) => {
					if (response.response.status === 404) {
						simpleMessage({
							header: 'Código de recuperação inválido!',
							text: 'Confirme se você esta utilizado o mesmo código recebido por e-mail e tente novamente.',
						})
					} else {
						errorMessage({
							header: 'Erro ao recuperar senha!',
							text: response,
						})
					}
				})
				.finally(() => {
					load('recoverPasswordStep', false)
				})
		} else {
			load('recoverPasswordStep')
			API.post(
				`/user/changeRecoveredPassword?email=${recoverForm.email}&recoverCode=${recoverForm.recoverCode}`,
				{
					newPassword: recoverForm.newPassword,
					passwordConfirm: recoverForm.newPasswordConfirm,
				}
			)
				.then(() => {
					simpleMessage({
						header: 'Senha recuperada com sucesso!',
						text: 'Parabéns, você agora recuperou o acesso a sua conta. A partir de agora, use esta nova senha para acessar sua conta.',
					})
					onClose()
				})
				.catch((response) => {
					errorMessage({
						header: 'Erro ao recuperar senha!',
						text: response,
					})
				})
				.finally(() => {
					load('recoverPasswordStep', false)
				})
		}
	}

	return (
		<CenteredPanel zIndex={50}>
			<CenteredPanelHeader
				icon="password"
				header={'Esqueci minha senha'}
				onClose={() => {
					navigate(PublicRoutes.login.path)
				}}
			/>
			<CenteredPanelContent loading={recoverForm.loading}>
				{!recoverForm.requestUserRecoverCode && (
					<p>
						Não entre em pânico, estamos aqui para te ajudar. Nos informe o mesmo endereço de{' '}
						<b>e-mail</b> utilizado para criar sua conta, e logo te falamos os próximos passos.
					</p>
				)}
				{recoverForm.requestUserRecoverCode && !recoverForm.validated && (
					<p>
						Quase lá, nos informe o <b>código de recuperação</b> enviado por e-mail.
					</p>
				)}
				{recoverForm.requestUserRecoverCode && recoverForm.validated && (
					<p>
						Ultima etapa. Informe a senha e confirme ela no segundo campo. Lembre de criar uma senha
						forte e mesmo assim fácil de lembrar.
					</p>
				)}
				<FormGroup
					fieldDefinition={{
						email: {
							label: 'E-mail',
							placeholder: 'Ex: exemplo@exemplo.com',
							fakeField: recoverForm.requestUserRecoverCode,
							hide: recoverForm.validated,
						},
						recoverCode: {
							label: 'Código de Recuperação',
							placeholder: 'Ex: 999999999',
							hide: !recoverForm.requestUserRecoverCode || recoverForm.validated,
							fakeField: recoverForm.validated,
						},
						newPassword: {
							label: 'Nova Senha',
							type: 'password',
							hide: !recoverForm.validated,
							passwordStrength: true,
						},
						newPasswordConfirm: {
							label: 'Confirmação da Senha',
							type: 'password',
							hide: !recoverForm.validated,
						},
					}}
					value={recoverForm}
					onChange={setRecoverForm}
				/>
			</CenteredPanelContent>
			<CenteredPanelFooter>
				<button data-loading={loading.recoverPasswordStep} onClick={nextStep}>
					Prosseguir
				</button>
			</CenteredPanelFooter>
		</CenteredPanel>
	)
}
