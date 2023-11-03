import { useMongoDatabase } from '../hooks/useMongoDatabase.js'
import { PrismaClient } from '@prisma/client'

export const Databases = (database) => (req, res, next) => {
	const prisma = new PrismaClient()

	req.database = {
		user: useMongoDatabase(prisma, 'user'),
		user_token: useMongoDatabase(prisma, 'userToken'),
		customer: useMongoDatabase(prisma, 'customer'),
		product: useMongoDatabase(prisma, 'product'),
	}
	next()
}
