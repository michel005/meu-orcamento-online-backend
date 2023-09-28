import {
	CenteredPanel,
	CenteredPanelContent,
	CenteredPanelFooter,
	CenteredPanelHeader,
	Field,
	Flex,
	FormGroup,
	Icon,
} from 'components'
import { PublicRoutes } from 'config/PublicRoutes'
import { PROJECT_INFO } from 'config/ProjectInfo'
import { ConfigContext, MessageContext } from 'hook'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../config/API'
import './CreateUserForm.scss'

const initialStepStatusValue = {
	active: 'invite',
	invite: {
		icon: <Icon icon="description" />,
		name: 'Convite',
		description: `Por enquanto, o ${PROJECT_INFO.header.text} esta em fase de testes, então é apenas possível testa-lo por convite de outro usuário. Informe aqui o código do seu convite.`,
		completed: false,
		fieldDefinition: {
			inviteCode: {
				label: 'Convite',
				validate: (value) => {
					if (!value || value.trim() === '') {
						return 'Campo obrigatório'
					}
				},
			},
		},
	},
	confirmCode: {
		icon: <Icon icon="mail" />,
		name: 'Confirmação do E-mail',
		description:
			'Enviamos um e-mail com um código de confirmação. Assim, temos certeza que você é de fato o destinatário do convite.',
		completed: false,
		fieldDefinition: {
			email: {
				label: 'E-mail',
				fakeField: true,
			},
			confirmCode: {
				label: 'Código de Confirmação',
				validate: (value) => {
					if (!value || value.trim() === '') {
						return 'Campo obrigatório'
					}
				},
			},
		},
	},
	personalData: {
		icon: <Icon icon="person" />,
		name: 'Dados Pessoais',
		description:
			'Dados básicos que irão identificar você para os seus clientes dentro do seu orçamento, e poderão ser utilizados para pagamentos em caso de mudança de assinatura.',
		completed: false,
		fieldDefinition: {
			fullName: {
				label: 'Nome Completo',
				validate: (value) => {
					if (!value || value.trim() === '') {
						return 'Nome completo é obrigatório'
					}
				},
			},
			email: {
				label: 'E-mail',
				fakeField: true,
			},
			password: {
				label: 'Senha',
				type: 'password',
				passwordStrength: true,
				validate: (value) => {
					if (!value || value.trim() === '') {
						return 'Senha é obrigatória'
					}
				},
			},
		},
		layoutDefinition: (fields) => (
			<>
				{fields.fullName}
				{fields.email}
				<div>{fields.password}</div>
			</>
		),
	},
	address: {
		icon: <Icon icon="mail" />,
		name: 'Endereço',
		description:
			'Seus clientes vão conseguir ver no seu orçamento onde você mora. Deixe em branco caso não queira essa informação no seu orçamento.',
		completed: false,
		fieldDefinition: {
			zipCode: {
				label: 'CEP',
			},
			district: {
				label: 'Bairro',
			},
			number: {
				label: 'Número',
			},
			state: {
				label: 'Estado',
			},
			city: {
				label: 'Cidade',
			},
			address: {
				label: 'Endereço',
			},
			complement: {
				label: 'Complemento',
			},
		},
		layoutDefinition: (fields) => (
			<>
				{fields.zipCode}
				<div className={'formRow'}>
					{fields.address}
					{fields.complement}
				</div>
				<div className={'formRow'}>
					{fields.district}
					{fields.number}
				</div>
				<div className={'formRow'}>
					{fields.state}
					{fields.city}
				</div>
			</>
		),
	},
	profilePicture: {
		description:
			'Coloque uma imagem de perfil. Não precisa necessariamente ser uma foto sua. Pode ser um logotipo da sua empresa, mascote ou um produto que você vende muito e simboliza o seu serviço.',
		icon: <Icon icon="image" />,
		name: 'Imagem do Perfil',
		completed: false,
		fieldDefinition: {},
	},
	conclusion: {
		width: '500px',
		description:
			'Aceite nossos termos de uso e consentimento que coletaremos dados para melhorar nossos serviços.',
		icon: <Icon icon="flag" />,
		name: 'Conclusão',
		completed: false,
		fieldDefinition: {},
	},
}

export const CreateUserForm = () => {
	const { simpleMessage, errorMessage } = useContext(MessageContext)
	const { loading, load } = useContext(ConfigContext)

	const navigate = useNavigate()

	const [imageUrl, setImageUrl] = useState(null)
	const [createForm, setCreateForm] = useState({})
	const [validation, setValidation] = useState({})
	const [stepStatus, setStepStatus] = useState({ ...initialStepStatusValue })

	const previousStep = () => {
		if (
			stepStatus.active !== 'invite' &&
			stepStatus.active !== 'confirmCode' &&
			stepStatus.active !== 'personalData'
		) {
			setStepStatus((s) => {
				if (s.active === 'confirmCode') {
					s.active = 'invite'
				} else if (s.active === 'personalData') {
					s.active = 'confirmCode'
				} else if (s.active === 'address') {
					s.active = 'personalData'
				} else if (s.active === 'profilePicture') {
					s.active = 'address'
				} else if (s.active === 'conclusion') {
					s.active = 'profilePicture'
				}

				return { ...s }
			})
		} else {
			navigate(PublicRoutes.login.path)
		}
	}

	const nextStepStatus = () => {
		setStepStatus((s) => {
			s[s.active].completed = true
			if (s.active === 'invite') {
				s.active = 'confirmCode'
			} else if (s.active === 'confirmCode') {
				s.active = 'personalData'
			} else if (s.active === 'personalData') {
				s.active = 'address'
			} else if (s.active === 'address') {
				s.active = 'profilePicture'
			} else if (s.active === 'profilePicture') {
				s.active = 'conclusion'
			}

			return { ...s }
		})
	}

	const nextStep = () => {
		if (stepStatus.active === 'invite') {
			load('createUserStep')
			API.get(`/invite/validate?code=${createForm.inviteCode}`)
				.then((response) => {
					setCreateForm((cf) => {
						cf.email = response.data
						return { ...cf }
					})
					simpleMessage({
						header: 'Confirme o seu e-mail!',
						text: 'Enviamos um e-mail com um código de confirmação. Informe esse código para prosseguir.',
					})
					nextStepStatus()
				})
				.catch(() => {
					simpleMessage({
						header: 'Convite não encontrado!',
						text: 'Verifique se digitou o código do convite corretamente e tente novamente.',
					})
				})
				.finally(() => {
					load('createUserStep', false)
				})
		} else if (stepStatus.active === 'confirmCode') {
			load('createUserStep')
			API.get(`/invite/confirmCode?code=${createForm.inviteCode}&confirm=${createForm.confirmCode}`)
				.then(() => {
					nextStepStatus()
				})
				.catch((error) => {
					if (error.response.status === 406) {
						simpleMessage({
							header: 'Problema ao cadastrar o usuário!',
							text: error.response.data,
						})
						navigate(PublicRoutes.login.path)
					} else {
						simpleMessage({
							header: 'O código de confirmação esta incorreto!',
							text: 'Verifique o código enviado por e-mail e tente novamente.',
						})
					}
				})
				.finally(() => {
					load('createUserStep', false)
				})
		} else {
			nextStepStatus()
		}
	}

	const runCreateUser = () => {
		API.post('/user/create', {
			fullName: createForm.fullName,
			email: createForm.email,
			password: createForm.password,
			inviteCode: createForm.inviteCode,
			confirmCode: createForm.confirmCode,
			address: {
				zipCode: createForm.zipCode,
				district: createForm.district,
				number: createForm.number,
				country: createForm.country,
				state: createForm.state,
				city: createForm.city,
				address: createForm.address,
				complement: createForm.complement,
			},
		})
			.then((response) => {
				let data = new FormData()
				data.append(
					'image',
					createForm?.profilePicture?.files?.[0],
					createForm.profilePicture.value
				)
				API.put('/user/updateImage', data, {
					headers: {
						Authorization: response.data.authHeader,
					},
				})
					.then(() => {
						simpleMessage({
							header: 'Usuário cadastrado com sucesso!',
							text: 'Parabéns, você esta a poucos passos de facilitar a sua vida de prestador de serviço. Realize o login para utilizar o Meu Orçamento Online, e seja muito bem vindo =]',
						})
						navigate(PublicRoutes.login.path)
					})
					.catch((error) => {
						console.log(error)
						errorMessage({
							header: 'Ops, tivemos um problema aqui!',
							text: error,
						})
					})
			})
			.catch((error) => {
				console.log(error)
				errorMessage({
					header: 'Ops, tivemos um problema aqui!',
					text: error,
				})
			})
	}

	useEffect(() => {
		if (!!createForm?.profilePicture) {
			setImageUrl(URL.createObjectURL(createForm?.profilePicture.files[0]))
		} else {
			setImageUrl(null)
		}
	}, [createForm])

	return (
		<CenteredPanel className="createForm" zIndex={50}>
			<CenteredPanelHeader icon="person" header="Vamos nos conhecer melhor?" />
			<CenteredPanelContent>
				<h3>
					{Object.keys(stepStatus).indexOf(stepStatus.active)}. {stepStatus[stepStatus.active].name}
				</h3>
				<p>{stepStatus[stepStatus.active].description}</p>
				{stepStatus.active !== 'profilePicture' && stepStatus.active !== 'conclusion' && (
					<FormGroup
						layoutDefinition={stepStatus[stepStatus.active].layoutDefinition}
						fieldDefinition={stepStatus[stepStatus.active].fieldDefinition}
						value={createForm}
						onChange={setCreateForm}
						validation={setValidation}
					/>
				)}
				{stepStatus.active === 'profilePicture' && (
					<div className={'profilePictureAndFile'}>
						<img
							alt="Imagem de Perfil"
							className={!!imageUrl ? 'haveImage' : ''}
							src={
								!!createForm?.profilePicture
									? URL.createObjectURL(createForm?.profilePicture.files[0])
									: ''
							}
						/>
						<Flex direction="row" align="center" gap="7px">
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									gap: '7px',
								}}
							>
								<button
									onClick={() => {
										document.getElementById('profilePictureInput').click()
									}}
								>
									Buscar...
								</button>
								{!!createForm.profilePicture && (
									<button
										className="transparent"
										onClick={() => {
											setCreateForm((cf) => {
												cf.profilePicture = null
												return { ...cf }
											})
										}}
									>
										Remover
									</button>
								)}
							</div>
						</Flex>
						<input
							id={'profilePictureInput'}
							type="file"
							accept="image/*"
							onChange={(e) => {
								setCreateForm((cf) => {
									cf.profilePicture = e.target
									return { ...cf }
								})
							}}
							style={{ display: 'none' }}
						/>
					</div>
				)}
				{stepStatus.active === 'conclusion' && (
					<Field
						type={'area'}
						label={'Termo de uso de dados'}
						value={
							'Ao prosseguir com o cadastro do seu usuário no Meu Orçamento Online, você concorda com os seguintes termos de uso:\r\n\r\n' +
							'1. Registrar dados de seus clientes de forma responsável e com máxima fidelidade.\r\n' +
							'2. Não expor informações pessoais de forma desnecessária como documentos confidenciais, fotos particulares etc.\r\n' +
							'3. Não compartilhar o seu acesso com demais pessoas, de forma que seu acesso seja utilizado por demais para fins comerciais não associados ao seu produto/serviço.\r\n\r\n' +
							'Sobre a utilização dos seus dados, o time Meu Orçamento Online se compromete a:\r\n\r\n' +
							'1. Não utilizar ou expor seus dados nem de seus clientes e orçamentos para fins comerciais ou de divulgação.\r\n' +
							'2. Manter uma performance aceitável para acesso diário dos seus dados.\r\n' +
							'3. Excluir, caso exigido pelo usuário através do sistema ou por requisição do suporte exclusivo, todo o dado solicitado.\r\n' +
							'4. Manter a integridade de todos os dados informados por você, de forma que não sejam alterados ou excluídos por fatores externos.\r\n' +
							'5. Oferecer todas as funcionalidades propostas pelo plano selecionado, ou pelo plano gratuito caso nenhum plano seja selecionado.\r\n' +
							'6. Não expor seus dados a riscos de segurança e a acessos indevidos.\r\n' +
							'7. Oferecer um ambiente seguro para pagamento e cancelamento de planos e valores.\r\n\r\n' +
							'Perante aos direitos de todas as pessoas e aos fatores legais influentes nela, este site se propõem a:\r\n\r\n' +
							'1. Contribuir com autoridades em caso de exigência explicita a documentações e dados.\r\n' +
							'2. Reportar atividades ilícitas ou suspeitas registradas pelo sistema, assim como textos ofensivos, discursos de ódio e imagens que violem a ética moral.\r\n' +
							'3. Garantir que este site atenta todas as normas instituídas pela LGPD e leis posteriores de segurança de dados e privacidade.\r\n'
						}
					/>
				)}
			</CenteredPanelContent>
			<CenteredPanelFooter>
				<button className="transparent" onClick={previousStep}>
					{stepStatus.active !== 'invite' && stepStatus.active !== 'confirmCode'
						? 'Voltar'
						: 'Voltar ao Login'}
				</button>
				<div className={'stepDisplay'}>
					{stepStatus.active !== 'invite' && (
						<span>
							{Object.keys(stepStatus).indexOf(stepStatus.active)} /{' '}
							{Object.keys(stepStatus).length - 1}
						</span>
					)}
				</div>
				<button
					disabled={validation.status === 'E'}
					data-loading={loading.createUserStep}
					onClick={() => {
						if (stepStatus.active === 'conclusion') {
							runCreateUser()
						} else {
							nextStep()
						}
					}}
				>
					{stepStatus.active === 'conclusion' ? 'Cadastrar' : 'Prosseguir'}
				</button>
			</CenteredPanelFooter>
		</CenteredPanel>
	)
}
