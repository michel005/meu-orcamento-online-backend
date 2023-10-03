import { useDatabase } from '../../../hooks/useDatabase.js'
import { Login } from './login.js'
import { Create } from './create.js'
import { Update } from './update.js'
import { Me } from './me.js'
import { ChangePassword } from './changePassword.js'

export const User = (app) => {
	const database = useDatabase('user')

	Login(app, database)
	Me(app, database)
	Create(app, database)
	Update(app, database)
	ChangePassword(app, database)
}
