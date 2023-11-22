import express, { Request, Response } from 'express'
import { HandleBusinessResponseAsync } from '../business/HandleBusinessResponse'
import { ValidateAndCreateProduct } from '../business/product/ValidateAndCreateProduct'
import { GetUrlByTypeAndIdentifier } from '../business/files/GetUrlByTypeAndIdentifier'
import { Database } from '../middlewares/databases'
import { RemoveCustomerPrivateInformation } from '../business/customer/RemoveCustomerPrivateInformation'
import { ValidateAndUpdateProduct } from '../business/product/ValidateAndUpdateProduct'
import { RemoveProductPrivateInformation } from '../business/product/RemoveProductPrivateInformation'
import { ProductType } from '../types/Product.type'

export const ProductRoute = express
	.Router()
	.post('/product', async (req: Request, res: Response) => {
		await HandleBusinessResponseAsync(res, async () => {
			return await ValidateAndCreateProduct({
				data: req.body,
				currentUser: (req as any).user,
			})
		})
	})
	.put('/product', async (req: Request, res: Response) => {
		await HandleBusinessResponseAsync(res, async () => {
			return await ValidateAndUpdateProduct({
				data: req.body,
				currentUser: (req as any).user,
			})
		})
	})
	.get('/product', async (req: Request, res: Response) => {
		const query: any = {
			user_id: (req as any).user.id,
			seller_id: req.query?.seller_id || undefined,
		}
		if (req.query?.search) {
			query.OR = [
				{
					title: { contains: req.query?.search },
				},
				{
					description: { contains: req.query?.search },
				},
				{
					code: { contains: req.query?.search },
				},
			]
		}
		if (req.query?.status) {
			query.status = {
				in: (req.query?.status as string).split(','),
			}
		}
		await HandleBusinessResponseAsync(res, async () => {
			const allProducts = await Database.product.findMany(query)
			for (let x = 0; x < allProducts.length; x++) {
				allProducts[x] = (await RemoveProductPrivateInformation(
					allProducts[x]
				)) as ProductType
			}
			return allProducts
		})
	})
