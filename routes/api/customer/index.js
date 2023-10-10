import { useDatabase } from '../../../hooks/useDatabase.js'
import { Create } from './create.js'
import { FindAll } from './findAll.js'
import { FindById } from './findById.js'
import { Update } from './update.js'
import { Delete } from './delete.js'

export const Customer = (app) => {
	const database = useDatabase('customer')

	Create(app)
	Update(app)
	Delete(app)
	FindById(app)
	FindAll(app)
}
