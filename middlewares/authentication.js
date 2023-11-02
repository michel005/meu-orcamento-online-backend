import { AuthenticationConfiguration } from '../config/AuthenticationConfiguration.js'
import { DateUtils } from '../utils/DateUtils.js'
import { newError } from '../utils/ErrorUtils.js'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const Authentication = async (req, res, next) => {
	if (
		AuthenticationConfiguration.publicRoutes.find(([method, path]) => {
			return method === req.method && path === req.path
		})
	) {
		next()
	} else {
		const authToken = req.headers?.auth_token
		if (!authToken) {
			res.status(400).json(newError('AUTH-001'))
		} else {
			const findedUserToken = (
				await req.database.user_token.findMany({
					token: authToken,
				})
			)?.[0]
			if (!findedUserToken) {
				res.status(400).send(newError('AUTH-002'))
			} else {
				const expirationDate = DateUtils.stringToDate(findedUserToken.expiration)
				if (new Date().getTime() > expirationDate.getTime()) {
					res.status(400).send(newError('AUTH-003'))
					return
				}
				req.user = await req.database.user.findOne(findedUserToken.user_id)
				if (!req.user) {
					res.status(400).send(newError('AUTH-003'))
					return
				}
				next()
			}
		}
	}
}
