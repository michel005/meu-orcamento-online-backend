import { useMongoDatabase } from '../hooks/useMongoDatabase.js'
import { MongoDBConfiguration } from '../config/MongoDBConfiguration.js'

export const Databases = (database) => (req, res, next) => {
	const db = database.db(MongoDBConfiguration.database)
	req.database = {
		user: useMongoDatabase(db, 'user'),
		user_token: useMongoDatabase(db, 'user_token'),
		customer: useMongoDatabase(db, 'customer'),
		product: useMongoDatabase(db, 'product'),
	}
	next()
}
