import { useMongoDatabase } from '../hooks/useMongoDatabase.js'
import { MongoDBConfiguration } from '../config/MongoDBConfiguration.js'
import { GeneralConfiguration } from '../config/GeneralConfiguration.js'
import { useDatabase } from '../hooks/useDatabase.js'

export const Databases = (database) => (req, res, next) => {
	const db = database.db(MongoDBConfiguration.database)
	if (GeneralConfiguration.databaseType === 'mongo') {
		req.database = {
			user: useMongoDatabase(db, 'user'),
			user_token: useMongoDatabase(db, 'user_token'),
			customer: useMongoDatabase(db, 'customer'),
			budget: useMongoDatabase(db, 'budget'),
		}
	} else {
		req.database = {
			user: useDatabase('user'),
			user_token: useDatabase('user_token'),
			customer: useDatabase('customer'),
			budget: useDatabase('budget'),
		}
	}
	next()
}
