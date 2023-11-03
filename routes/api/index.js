import { Customer } from './customer/index.js'
import { Product } from './product/index.js'

export const Api = (app) => {
	Customer(app)
	Product(app)
}
