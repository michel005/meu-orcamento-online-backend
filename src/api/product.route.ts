import express, { Request, Response } from 'express'
import { HandleBusinessResponseAsync } from '../business/HandleBusinessResponse'
import { ValidateAndCreateProduct } from '../business/product/ValidateAndCreateProduct'
import { GetUrlByTypeAndIdentifier } from '../business/files/GetUrlByTypeAndIdentifier'
import { Database } from '../middlewares/databases'

export const ProductRoute = express
	.Router()
	.post('/product', async (req: Request, res: Response) => {
		console.log(await Database.product.findAll())
		await HandleBusinessResponseAsync(res, async () => {
			return await ValidateAndCreateProduct({
				data: req.body,
				currentUser: (req as any).user,
			})
		})
	})
	.get('/product', async (req: Request, res: Response) => {
		await HandleBusinessResponseAsync(res, async () => {
			return (
				await Database.product.findMany({
					user_id: (req as any).user.id,
				})
			).map((x) => {
				x.customer.picture = GetUrlByTypeAndIdentifier(
					'customer',
					x.customer.id as string,
					(req as any).user.id
				)
				return { ...x }
			})
		})
	})
