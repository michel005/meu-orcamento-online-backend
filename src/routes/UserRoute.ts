import express from 'express'
import { Db } from 'mongodb'
import { UserParser } from '../parser/UserParser'
import { UserService } from '../service/UserService'
import { UserType } from '../types/UserType'
import { BusinessRouteProcessor } from '../utils/BusinessRouteProcessor'

export const UserRoute = (database: Db) => {
	const userDatabase = database.collection<UserType>('user')

	return express
		.Router()
		.post('/user/login', (req, res) => {
			BusinessRouteProcessor(res, async () => {
				return await UserService.login({
					user_name: req.body.user_name,
					password: req.body.password,
				})
			})
		})
		.post('/user', (req, res) => {
			BusinessRouteProcessor(res, async () => {
				return await UserService.create({ user: req.body })
			})
		})
		.put('/user', (req, res) => {
			BusinessRouteProcessor(res, async () => {
				return UserService.update({
					user: req.body,
					currentUser: (req as any).user,
				})
			})
		})
		.delete('/user', (req, res) => {
			BusinessRouteProcessor(res, async () => {
				await userDatabase.deleteOne({
					_id: (req as any).user._id,
				})
			})
		})
		.get('/user/me', (req, res) => {
			res.status(200).json(UserParser((req as any).user, true))
		})
}
