import { DashboardPage } from 'pages/private/DashboardPage'

export const PrivateRoutes = {
	dashboard: {
		order: 1,
		path: '/dashboard',
		icon: 'home',
		render: () => <DashboardPage />,
		header: 'Dashboard',
	},
	account: {
		order: 1,
		path: '/account',
		icon: 'wallet',
		render: () => <h3>Contas</h3>,
		header: 'Contas',
	},
	movement: {
		order: 1,
		path: '/movement',
		icon: 'shopping_cart',
		render: () => <h3>Movimentações</h3>,
		header: 'Movimentações',
	},
	goal: {
		order: 1,
		path: '/goal',
		icon: 'flag',
		render: () => <h3>Metas Financeiras</h3>,
		header: 'Metas Financeiras',
	},
}
