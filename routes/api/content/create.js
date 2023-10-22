import fs from 'fs'
import { v4 as uuid } from 'uuid'
import { ContentConfiguration } from '../../../config/ContentConfiguration.js'

export const Create = (app) => {
	app.post('/api/content', async (req, res) => {
		try {
			const value = {
				id: uuid(),
				user_id: req.user._id,
				content: req.body.content,
				type: req.body.type,
			}
			const userFolder = `${ContentConfiguration.mainFolder}/${value.user_id}`
			if (!fs.existsSync(userFolder)) {
				fs.mkdirSync(`${ContentConfiguration.mainFolder}/${value.user_id}`)
			}
			fs.writeFileSync(`${userFolder}/${value.type}_${value.id}`, value.content)

			res.status(200).json({
				...value,
				content: undefined,
				user_id: undefined,
			})
		} catch (error) {
			res.status(400).json(error)
		}
	})
}
