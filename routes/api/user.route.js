import express from 'express'
import { HandleBusinessResponseAsync } from '../../business/HandleBusinessResponse.js'
import { LoginUserWithUserNameAndPassword } from '../../business/user/LoginUserWithUserNameAndPassword.js'
import { RemoveUserPrivateInformation } from '../../business/user/RemoveUserPrivateInformation.js'
import { ValidateAndCreateUser } from '../../business/user/ValidateAndCreateUser.js'
import { ValidateAndUpdateUser } from '../../business/user/ValidateAndUpdateUser.js'
import { ChangeUserPassword } from '../../business/user/ChangeUserPassword.js'

const UserRoute = express
	.Router()
	.post('/api/user/login', async (req, res) => {
		return await HandleBusinessResponseAsync(res, async () => {
			return LoginUserWithUserNameAndPassword(
				req.database.user,
				req.database.user_token,
				req.body?.user_name,
				req.body?.password,
				req.ip
			)
		})
	})
	.post('/api/user/me', async (req, res) => {
		return await HandleBusinessResponseAsync(req, () => {
			if (!req.user) {
				throw null
			}
			return RemoveUserPrivateInformation(req.user)
		})
	})
	.post('/api/user', async (req, res) => {
		return await HandleBusinessResponseAsync(res, async () => {
			return await ValidateAndCreateUser(req.database.user, req.body)
		})
	})
	.put('/api/user', async (req, res) => {
		return await HandleBusinessResponseAsync(res, async () => {
			return await ValidateAndUpdateUser(req.database.user, req.user, req.body)
		})
	})
	.post('/api/user/changePassword', async (req, res) => {
		return await HandleBusinessResponseAsync(res, async () => {
			return await ChangeUserPassword(
				req.database.user,
				req.user,
				req.body?.old_password,
				req.body?.new_password,
				req.body?.new_password_confirm
			)
		})
	})

export { UserRoute }
