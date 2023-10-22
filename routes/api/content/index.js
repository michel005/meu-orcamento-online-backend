import { Create } from './create.js'
import { Delete } from './delete.js'
import { Get } from './get.js'

export const Content = (app) => {
	Create(app)
	Delete(app)
	Get(app)
}
