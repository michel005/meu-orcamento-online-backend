import { UserType } from './src/types/User.type'

declare global {
	namespace Express {
		interface Request {
			user: UserType
		}
	}
}
