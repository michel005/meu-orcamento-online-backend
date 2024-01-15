import express from 'express'
import { PictureService } from '../service/PictureService'

export const PictureRoute = () => {
	return express
		.Router()
		.post('/picture/:type/:id', (req, res) => {
			const { type, id } = req.params
			PictureService.save(req.body.picture, type, id, (req as any).user.user_name)
			res.status(200).send(PictureService.getUrl(type, id))
		})
		.delete('/picture/:type/:id', (req, res) => {
			const { type, id } = req.params
			PictureService.remove(type, id, (req as any).user.user_name)
			res.status(200).send()
		})
		.get('/picture/:type/:id', (req, res) => {
			const { type, id } = req.params
			const userName: string = (req as any)?.user?.user_name
			const filePath = PictureService.getFilePath(type, id, userName)
			if (!PictureService.haveFile(type, id, userName) || !filePath) {
				res.status(404).send()
				return
			}

			res.status(200).sendFile(filePath)
		})
}
