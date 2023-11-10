import { AuthenticationConfiguration } from '../config/AuthenticationConfiguration.js'
import { DateUtils } from '../utils/DateUtils.js'
import { newError } from '../utils/ErrorUtils.js'
import { pathToRegexp } from 'path-to-regexp'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const Authentication = async (req, res, next) => {
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
				await req.database.user_token.findMany({
					token: authToken,
				})
			)?.[0]
			if (!foundedUser) {
				res.status(400).send(newError('AUTH-002'))
			} else {
				const expirationDate = DateUtils.stringToDate(foundedUser.expiration)
				if (new Date().getTime() > expirationDate.getTime()) {
					res.status(400).send(newError('AUTH-003'))
					return
				}
				req.user = await req.database.user.findOne(foundedUser.user_id)
				if (!req.user) {
					res.status(400).send(newError('AUTH-003'))
					return
				}
				next()
			}
		}
	}
}
