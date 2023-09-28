import { HomePage } from 'pages/public/HomePage'
import { CreateUserForm } from 'pages/public/CreateUserForm'
import { LoginForm } from 'pages/public/LoginForm'
import { RecoverPasswordForm } from 'pages/public/RecoverPasswordForm'

export const PublicRoutes = {
	login: {
		path: '/login',
		render: () => <LoginForm />,
		show: false,
	},
	createUser: {
		path: '/createUser',
		render: () => <CreateUserForm />,
		show: false,
	},
	recoverPassword: {
		path: '/recoverPassword',
		render: () => <RecoverPasswordForm />,
		show: false,
	},
	home: {
		path: '/',
		header: 'Início',
		className: 'link',
		render: () => <HomePage />,
	},
	plans: {
		path: '/plans',
		header: 'Planos',
		className: 'link',
		render: () => <h3>Planos</h3>,
	},
	about: {
		path: '/about',
		header: 'Sobre',
		className: 'link',
		render: () => <h3>Sobre</h3>,
	},
}
