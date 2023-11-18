import { UserType } from './User.type'

export type UserTokenType = {
	user_id: string
	date_time: string
	token: string
	expiration: string
	user?: UserType
}
