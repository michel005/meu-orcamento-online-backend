import { ContentConfiguration } from '../../../config/ContentConfiguration.js'
import fs from 'fs'

export const Get = (app) => {
	app.get('/api/content', async (req, res) => {
		try {
			const value = {
				id: req.query.id,
				user_id: req.user._id,
				type: req.query.type,
			}
			const userFolder = `${ContentConfiguration.mainFolder}/${value.user_id}`
			if (
				!fs.existsSync(userFolder) ||
				!fs.existsSync(`${userFolder}/${value.type}_${value.id}`)
			) {
				res.status(400).send()
				return
			}
			const fileContent = String(fs.readFileSync(`${userFolder}/${value.type}_${value.id}`))

			res.status(200).send(fileContent)
		} catch (error) {
			res.status(400).json(error)
		}
	})
}
