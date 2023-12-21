import express from 'express'
import cors from 'cors'
import { Authentication } from './middlewares/authentication'
import { UserRoute } from './api/user.route'
import { CustomerRoute } from './api/customer.route'
import { FileRoute } from './api/file.route'
import { ProductRoute } from './api/product.route'
import { WaitingListRoute } from './api/waitingList.route'

export class App {
	public server

	constructor() {
		this.server = express()
			.use(express.json({ limit: '10mb' }))
			.use(express.urlencoded({ extended: true, limit: '10mb' }))
			.use(cors())
			.use(Authentication)
			.use(
				'/api',
				express
					.Router()
					.use(UserRoute)
					.use(CustomerRoute)
					.use(FileRoute)
					.use(ProductRoute)
					.use(WaitingListRoute)
			)
	}
}
