import { Db, ObjectId } from 'mongodb'
import { pathToRegexp } from 'path-to-regexp'
import { Request, Response, NextFunction } from 'express'
import { ErrorUtils } from '../utils/ErrorUtils'
import { DateUtils } from '../utils/DateUtils'
import { UserType } from '../types/UserType'
import { UserParser } from '../parser/UserParser'
import { PictureService } from '../service/PictureService'

const publicRoutes = [
	['POST', '/api/user/login'],
	['POST', '/api/user'],
	['POST', '/api/picture/:type/:identifier'],
	['DELETE', '/api/picture/:type/:identifier'],
]

export const AuthenticationMiddleware = (database: Db) => {
	const userDatabase = database.collection<UserType>('user')
	const userTokenDatabase = database.collection('user_token')

	return (req: any, res: Response, next: NextFunction) => {
		if (
			publicRoutes.find(([method, path]) => {
				return method === req.method && pathToRegexp(path, []).exec(req.path)
			})
		) {
			next()
		} else {
			const authToken = req?.headers?.authorization?.split(' ')[1]
			if (!authToken) {
				res.status(400).json(ErrorUtils.getError('AUTH-001'))
			} else {
				userTokenDatabase
					.findOne({
						token: authToken,
					})
					.then((response) => {
						const expirationDate = DateUtils.stringToDate(response?.expiration)
						if (new Date().getTime() > expirationDate.getTime()) {
							res.status(400).json(ErrorUtils.getError('AUTH-003'))
						} else {
							userDatabase
								.findOne({
									_id: response?.user_id,
								})
								.then((response2) => {
									if (response2) {
										req.user = UserParser(response2, false)
										next()
									} else {
										res.status(400).json(ErrorUtils.getError('AUTH-002'))
									}
								})
								.catch(() => {
									res.status(400).json(ErrorUtils.getError('AUTH-002'))
								})
						}
					})
					.catch((response) => {
						console.log({ response })
						res.status(400).json(ErrorUtils.getError('AUTH-002'))
					})
			}
		}
	}
}
