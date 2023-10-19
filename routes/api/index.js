import { User } from './user/index.js'
import { Customer } from './customer/index.js'
import { Definition } from './def/index.js'
import { Product } from './product/index.js'

export const Api = (app) => {
	Definition(app)
	User(app)
	Customer(app)
	Product(app)
}
