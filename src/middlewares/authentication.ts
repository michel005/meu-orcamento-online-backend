import { AuthenticationConfiguration } from '../config/AuthenticationConfiguration'
import { DateUtils } from '../utils/DateUtils'
import { newError } from '../utils/ErrorUtils'
import { pathToRegexp } from 'path-to-regexp'
import { Request, Response, NextFunction } from 'express'
import { Database } from './databases'

export const Authentication = async (req: Request, res: Response, next: NextFunction) => {
	if (
		AuthenticationConfiguration.publicRoutes.find(([method, path]) => {
			return method === req.method && pathToRegexp(path, []).exec(req.path)
		})
	) {
		next()
	} else {
		const authToken = req?.headers?.authorization?.split(' ')[1]
		if (!authToken) {
			res.status(400).json(newError('AUTH-001'))
		} else {
			const foundedUser = (
				await Database.user_token.findMany({
					token: authToken,
				})
			)?.[0]
			if (!foundedUser) {
				res.status(400).json(newError('AUTH-002'))
			} else {
				const expirationDate = DateUtils.stringToDate(foundedUser.expiration)
				if (new Date().getTime() > expirationDate.getTime()) {
					res.status(400).json(newError('AUTH-003'))
					return
				}
				;(req as any).user = await Database.user.findOne(foundedUser.user_id)
				if (!(req as any).user) {
					res.status(400).json(newError('AUTH-003'))
					return
				}
				next()
			}
		}
	}
}
