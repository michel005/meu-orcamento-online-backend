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
		req.user = {
			user_name: 'michel005',
			full_name: 'Michel Douglas Grigoli',
			picture: null,
			email: 'mdgrigoli@hotmail.com.br',
		}
		next()
	}
}
