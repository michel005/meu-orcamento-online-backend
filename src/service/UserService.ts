import { Collection, Db } from 'mongodb'
import { ErrorUtils } from '../utils/ErrorUtils'
import { randomUUID } from 'crypto'
import { DateUtils } from '../utils/DateUtils'
import { UserType } from '../types/UserType'
import { UserBusiness } from '../business/UserBusiness'
import { UserParser } from '../parser/UserParser'
import { PictureService } from './PictureService'
import { PictureType } from '../types/PictureType'

export class UserService {
	static userDatabase: Collection<UserType>
	static userTokenDatabase: Collection

	static saveImage = (picture?: PictureType, userName?: string) => {
		console.log({ picture, userName })
		if (picture) {
			if (picture.type === 'file' && userName) {
				PictureService.save(picture.value, 'user', userName, userName)
			}
		} else {
			if (userName) {
				PictureService.remove('user', userName)
			}
		}
	}

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
			full_name: user.full_name,
			email: user.email,
			birthday: user.birthday,
			phone: user.phone,
			address: user.address,
			person_type: user.person_type,
			document_type: user.document_type,
			document_number: user.document_number,
			created: DateUtils.dateTimeToString(new Date()),
		})
		UserService.saveImage(user.picture, user.user_name)
		return UserParser(user, true)
	}

	static update = async ({ user, currentUser }: { user: UserType; currentUser: UserType }) => {
		UserBusiness.validateUpdate(user)
		await UserService.userDatabase.updateOne(
			{
				_id: currentUser._id,
			},
			{
				$set: {
					full_name: user.full_name,
					email: user.email,
					birthday: user.birthday,
					phone: user.phone,
					address: user.address,
					person_type: user.person_type,
					document_type: user.document_type,
					document_number: user.document_number,
					updated: DateUtils.dateTimeToString(new Date()),
				},
			}
		)
		const updatedUser = await UserService.userDatabase.findOne({
			_id: currentUser._id,
		})
		UserService.saveImage(user.picture, user.user_name)
		return UserParser(updatedUser, true)
	}
}
