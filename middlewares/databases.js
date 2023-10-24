import { useMysqlDatabase } from '../hooks/useMysqlDatabase.js'

export const Databases = (database, mysqlDatabase) => (req, res, next) => {
	// req.database = {
	// 	user: useMysqlDatabase(mysqlDatabase, 'meuOrcamentoOnline.user'),
	// 	user_token: useMysqlDatabase(mysqlDatabase, 'meuOrcamentoOnline.user_token'),
	// 	customer: useMysqlDatabase(mysqlDatabase, 'meuOrcamentoOnline.customer'),
	// 	product: useMysqlDatabase(mysqlDatabase, 'meuOrcamentoOnline.product'),
	// }
	next()
	// const db = database.db(MongoDBConfiguration.database)
	// req.database = {
	// 	user: useMongoDatabase(db, 'user'),
	// 	user_token: useMongoDatabase(db, 'user_token'),
	// 	customer: useMongoDatabase(db, 'customer'),
	// 	product: useMongoDatabase(db, 'product'),
	// }
}
