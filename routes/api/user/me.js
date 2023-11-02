import { RemoveUserPrivateInformation } from '../../../business/user/RemoveUserPrivateInformation.js'

export const Me = (app) => {
	app.post('/api/user/me', (req, res) => {
		if (req.user) {
			res.status(200).json(RemoveUserPrivateInformation(req.user))
		} else {
			res.status(404).send()
		}
	})
}
