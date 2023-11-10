import express from 'express'
import {
	HandleBusinessFileResponseAsync,
	HandleBusinessResponse,
	HandleBusinessResponseAsync,
} from '../../business/HandleBusinessResponse.js'
import { LoginUserWithUserNameAndPassword } from '../../business/user/LoginUserWithUserNameAndPassword.js'
import { RemoveUserPrivateInformation } from '../../business/user/RemoveUserPrivateInformation.js'
import { ValidateAndCreateUser } from '../../business/user/ValidateAndCreateUser.js'
import { ValidateAndUpdateUser } from '../../business/user/ValidateAndUpdateUser.js'
import { ChangeUserPassword } from '../../business/user/ChangeUserPassword.js'
import { GetFileByTypeAndIdentifier } from '../../business/files/GetFileByTypeAndIdentifier.js'
import fs from 'fs'
import { GeneralConfiguration } from '../../config/GeneralConfiguration.js'

export const FileRoute = express.Router().get('/file/:type/:identifier', async (req, res) => {
	return await HandleBusinessResponse(res, async () => {
		let userId = null
		if (req.params.type === 'customer') {
			userId = (await req.database.customer.findOne(req.params.identifier)).user.id
		}
		if (req.params.type === 'user') {
			let user = (
				await req.database.user_token.findMany({
					token: req.params.identifier,
				})
			)?.[0]?.user
			if (!user) {
				user = await req.database.user.findOne(req.params.identifier)
			}
			if (user && fs.existsSync(`${GeneralConfiguration.uploadDir}/${user.id}/profile.png`)) {
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
