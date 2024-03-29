import { UserType } from './src/types/UserType'

declare global {
	namespace Express {
		interface Request {
			user: UserType
		}
	}
}
