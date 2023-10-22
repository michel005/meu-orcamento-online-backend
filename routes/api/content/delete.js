import { ContentConfiguration } from '../../../config/ContentConfiguration.js'
import fs from 'fs'

export const Delete = (app) => {
	app.delete('/api/content', async (req, res) => {
		try {
			const value = {
				id: req.query.id,
				user_id: req.user._id,
				type: req.query.type,
			}
			const userFolder = `${ContentConfiguration.mainFolder}/${value.user_id}`
			if (
				!fs.existsSync(userFolder) ||
				!fs.existsSync(`${userFolder}/${value.type}_${value._id}`)
			) {
				res.status(200).send()
				return
			}
			fs.rmSync(`${userFolder}/${value.type}_${value._id}`)

			res.status(200).send()
		} catch (error) {
			res.status(400).json(error)
		}
	})
}
