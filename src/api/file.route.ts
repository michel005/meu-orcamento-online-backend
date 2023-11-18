import express, { Request, Response } from 'express'
import fs from 'fs'
import { HandleBusinessResponse } from '../business/HandleBusinessResponse'
import { GeneralConfiguration } from '../config/GeneralConfiguration'
import { Database } from '../middlewares/databases'

export const FileRoute = express
	.Router()
	.get('/file/:type/:identifier', async (req: Request, res: Response) => {
		return await HandleBusinessResponse(res, async () => {
			let userId = null
			if (req.params.type === 'customer') {
				userId = (await Database.customer.findOne(req.params.identifier))?.user?.id
			}
			if (req.params.type === 'user') {
				let user = (
					await Database.user_token.findMany({
						token: req.params.identifier,
					})
				)?.[0]?.user
				if (!user) {
					user = await Database.user.findOne(req.params.identifier)
				}
				if (
					user &&
					fs.existsSync(`${GeneralConfiguration.uploadDir}/${user.id}/profile.png`)
				) {
					res.sendFile(`${GeneralConfiguration.uploadDir}/${user.id}/profile.png`)
				} else {
					res.send()
				}
			} else {
				if (
					fs.existsSync(
						`${GeneralConfiguration.uploadDir}/${userId}/${req.params.type}/${req.params.identifier}.png`
					)
				) {
					res.sendFile(
						`${GeneralConfiguration.uploadDir}/${userId}/${req.params.type}/${req.params.identifier}.png`
					)
				} else {
					res.send()
				}
			}
		})
	})
