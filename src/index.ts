import express from 'express'
import { UserRoute } from './routes/UserRoute'
import { MongoClient } from 'mongodb'
import { AuthenticationMiddleware } from './middleware/AuthenticationMiddleware'
import { CustomerRoute } from './routes/CustomerRoute'
import { CustomerBusiness } from './business/CustomerBusiness'
import { UserService } from './service/UserService'
import cors from 'cors'
import { CustomerService } from './service/CustomerService'
import { CustomerType } from './types/CustomerType'
import { UserType } from './types/UserType'
import { ProductRoute } from './routes/ProductRoute'
import { ProductBusiness } from './business/ProductBusiness'
import { ProductService } from './service/ProductService'
import { ProductType } from './types/ProductType'
import { PictureRoute } from './routes/PictureRoute'
import { DashboardRoute } from './routes/DashboardRoute'

const client = new MongoClient('mongodb://127.0.0.1:27017')
const database = client.db('meuOrcamentoOnline')

CustomerBusiness.databaseClient = database
ProductBusiness.databaseClient = database

UserService.userDatabase = database.collection<UserType>('user')
UserService.userTokenDatabase = database.collection('user_token')
CustomerService.customerDatabase = database.collection<CustomerType>('customer')
ProductService.productDatabase = database.collection<ProductType>('product')

const server = express()
server.use(cors())
server.use(express.json({ limit: '10mb' }))
server.use(express.urlencoded({ extended: true, limit: '10mb' }))
server.use(AuthenticationMiddleware(database))
server.use(
	'/api',
	express
		.Router()
		.use(UserRoute(database))
		.use(DashboardRoute())
		.use(CustomerRoute())
		.use(ProductRoute())
		.use(PictureRoute())
)

server.listen(8080, () => {
	console.log('Up in port 8080')
})
