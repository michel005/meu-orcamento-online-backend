import { useMySQLDatabase } from '../hooks/useMySQLDatabase.js'

export const Databases = (prisma) => (req, res, next) => {
	req.database = {
		user: useMySQLDatabase(prisma, 'user', ['address']),
		user_token: useMySQLDatabase(prisma, 'user_token', ['user']),
		customer: useMySQLDatabase(prisma, 'customer', ['address', 'user']),
		address: useMySQLDatabase(prisma, 'address'),
		// product: useMySQLDatabase(prisma, 'product'),
	}
	next()
}
