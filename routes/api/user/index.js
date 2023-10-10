import { useDatabase } from '../../../hooks/useDatabase.js'
import { Login } from './login.js'
import { Create } from './create.js'
import { Update } from './update.js'
import { Me } from './me.js'
import { ChangePassword } from './changePassword.js'
import { useSchemaValidation } from '../../../hooks/useSchemaValidation.js'

export const User = (app) => {
	Login(app)
	Me(app)
	Create(app)
	Update(app)
	ChangePassword(app)
}
