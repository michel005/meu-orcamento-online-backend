import { FakeCustomer } from '../../../fake/FakeCustomer.js'

export const FindAll = (app) => {
	app.get('/api/customer', (req, res) => {
		res.status(200).json([...new Array(100).fill(null).map((_, index) => FakeCustomer())])
	})
}
