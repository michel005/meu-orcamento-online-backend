import { Collection, Db } from 'mongodb'
import { ErrorUtils } from '../utils/ErrorUtils'
import { randomUUID } from 'crypto'
import { DateUtils } from '../utils/DateUtils'
import { UserType } from '../types/UserType'
import { UserBusiness } from '../business/UserBusiness'
import { UserParser } from '../parser/UserParser'

export class UserService {
	static userDatabase: Collection<UserType>
	static userTokenDatabase: Collection

	static login = async ({ user_name, password }: { user_name: string; password: string }) => {
		const userFound = await UserService.userDatabase.findOne({
			user_name: user_name,
			password: password,
		})
		if (!userFound) {
			throw ErrorUtils.getError('AUTH-004')
		}
		const expirationDate = new Date()
		expirationDate.setMonth(expirationDate.getMonth() + 1)

		const token = randomUUID()
		await UserService.userTokenDatabase.insertOne({
			user_id: userFound?._id,
			date_time: DateUtils.dateTimeToString(new Date()),
			token: token,
			expiration: DateUtils.dateToString(expirationDate),
		})
		return {
			token,
		}
	}

	static create = async ({ user }: { user: UserType }) => {
		UserBusiness.validate(user)
		await UserService.userDatabase.insertOne({
			...user,
			created: DateUtils.dateTimeToString(new Date()),
		})
		return UserParser(user, true)
	}

	static update = async ({ user, currentUser }: { user: UserType; currentUser: UserType }) => {
		UserBusiness.validateUpdate(user)
		await UserService.userDatabase.updateOne(
			{
				_id: currentUser._id,
			},
			{
				$set: JSON.parse(
					JSON.stringify({
						...user,
						_id: undefined,
						created: undefined,
						updated: DateUtils.dateTimeToString(new Date()),
						user_name: undefined,
						password: undefined,
					})
				),
			}
		)
		const updatedUser = await UserService.userDatabase.findOne({
			_id: currentUser._id,
		})
		return UserParser(updatedUser, true)
	}
}
