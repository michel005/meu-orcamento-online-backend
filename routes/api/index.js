import { User } from './user/index.js'
import { Customer } from './customer/index.js'
import { Product } from './product/index.js'
import { Content } from './content/index.js'

export const Api = (app) => {
	User(app)
	Customer(app)
	Product(app)
	Content(app)
}
