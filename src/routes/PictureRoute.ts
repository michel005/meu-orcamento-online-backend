import express from 'express'
import { PictureService } from '../service/PictureService'

export const PictureRoute = () => {
	return express
		.Router()
		.post('/picture/:type/:id', (req, res) => {
			const { type, id } = req.params
			PictureService.save(req.body.picture, type, id)
			res.status(200).send(PictureService.getUrl(type, id))
		})
		.delete('/picture/:type/:id', (req, res) => {
			const { type, id } = req.params
			PictureService.remove(type, id)
			res.status(200).send()
		})
		.get('/picture/:type/:id', (req, res) => {
			const { type, id } = req.params
			if (!PictureService.haveFile(type, id)) {
				res.status(404).send()
			}
			res.status(200).sendFile(PictureService.getFilePath(type, id))
		})
}
