import express, { Request, Response } from 'express'
import { HandleBusinessResponseAsync } from '../business/HandleBusinessResponse'
import { GetUrlByTypeAndIdentifier } from '../business/files/GetUrlByTypeAndIdentifier'
import { ChangeUserPassword } from '../business/user/ChangeUserPassword'
import { LoginUserWithUserNameAndPassword } from '../business/user/LoginUserWithUserNameAndPassword'
import { RemoveUserPrivateInformation } from '../business/user/RemoveUserPrivateInformation'
import { ValidateAndCreateUser } from '../business/user/ValidateAndCreateUser'
import { ValidateAndUpdateUser } from '../business/user/ValidateAndUpdateUser'

export const UserRoute = express
	.Router()
	.post('/user/login', async (req: Request, res: Response) => {
		return await HandleBusinessResponseAsync(res, async () => {
			return LoginUserWithUserNameAndPassword({
				userName: req.body?.user_name,
				password: req.body?.password,
			})
		})
	})
	.post('/user/me', async (req: Request, res: Response) => {
		return await HandleBusinessResponseAsync(res, async () => {
			if (!(req as any).user) {
				throw null
			}
			return {
				user: RemoveUserPrivateInformation({
					...(req as any).user,
					picture: GetUrlByTypeAndIdentifier(
						'user',
						(req as any).user.id as string,
						(req as any).user.id as string
					),
					address: undefined,
					address_id: undefined,
				}),
				address: (req as any).user.address || {},
			}
		})
	})
	.post('/user', async (req: Request, res: Response) => {
		return await HandleBusinessResponseAsync(res, async () => {
			return await ValidateAndCreateUser({
				value: req.body,
			})
		})
	})
	.put('/user', async (req: Request, res: Response) => {
		return await HandleBusinessResponseAsync(res, async () => {
			return await ValidateAndUpdateUser({
				currentUser: (req as any).user,
				changed: req.body,
			})
		})
	})
	.post('/user/changePassword', async (req: Request, res: Response) => {
		return await HandleBusinessResponseAsync(res, async () => {
			const passwordInfo = {
				old_password: req.body?.old_password as string,
				new_password: req.body?.new_password as string,
				new_password_confirm: req.body?.new_password_confirm as string,
			}
			return await ChangeUserPassword({
				currentUser: (req as any).user,
				passwordInfo,
			})
		})
	})
