import { ErrorCode } from '../../../const/ErrorCode.js'

export const Definition = (app) => {
	app.get('/api/def', (req, res) => {
		res.status(200).json(ErrorCode)
	})
}
