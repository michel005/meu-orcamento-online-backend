import express from 'express'
import { HandleBusinessResponseAsync } from '../../business/HandleBusinessResponse.js'
import { LoginUserWithUserNameAndPassword } from '../../business/user/LoginUserWithUserNameAndPassword.js'
import { RemoveUserPrivateInformation } from '../../business/user/RemoveUserPrivateInformation.js'
import { ValidateAndCreateUser } from '../../business/user/ValidateAndCreateUser.js'
import { ValidateAndUpdateUser } from '../../business/user/ValidateAndUpdateUser.js'
import { ChangeUserPassword } from '../../business/user/ChangeUserPassword.js'
import { GetFileByTypeAndIdentifier } from '../../business/files/GetFileByTypeAndIdentifier.js'

export const UserRoute = express
	.Router()
	.post('/api/user/login', async (req, res) => {
		return await HandleBusinessResponseAsync(res, async () => {
			return LoginUserWithUserNameAndPassword(
				req.database,
				req.body?.user_name,
				req.body?.password
			)
		})
	})
	.post('/api/user/me', async (req, res) => {
		return await HandleBusinessResponseAsync(res, async () => {
			if (!req.user) {
				throw null
			}
			return {
				user: RemoveUserPrivateInformation({
					...req.user,
					picture: GetFileByTypeAndIdentifier('user', req.user.id),
					address: undefined,
					address_id: undefined,
				}),
				address: req.user.address || {},
			}
		})
	})
	.post('/api/user', async (req, res) => {
		return await HandleBusinessResponseAsync(res, async () => {
			return await ValidateAndCreateUser(req.database, req.body)
		})
	})
	.put('/api/user', async (req, res) => {
		return await HandleBusinessResponseAsync(res, async () => {
			return await ValidateAndUpdateUser(
				req.database,
				req.user,
				req.body,
				req.headers.auth_token
			)
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
