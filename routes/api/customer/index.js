import { Create } from './create.js'
import { FindAll } from './findAll.js'
import { FindById } from './findById.js'
import { Update } from './update.js'
import { Delete } from './delete.js'

export const Customer = (app) => {
	Create(app)
	Update(app)
	Delete(app)
	FindById(app)
	FindAll(app)
}
