import express, { Request, Response } from 'express'
import { HandleBusinessResponseAsync } from '../business/HandleBusinessResponse'
import { ValidateAndCreateProduct } from '../business/product/ValidateAndCreateProduct'
import { GetUrlByTypeAndIdentifier } from '../business/files/GetUrlByTypeAndIdentifier'
import { Database } from '../middlewares/databases'
import { RemoveCustomerPrivateInformation } from '../business/customer/RemoveCustomerPrivateInformation'
import { ValidateAndUpdateProduct } from '../business/product/ValidateAndUpdateProduct'
import { RemoveProductPrivateInformation } from '../business/product/RemoveProductPrivateInformation'
import { ProductType } from '../types/Product.type'
import { ValidateAndCreateProductBulk } from '../business/product/ValidateAndCreateProductBulk'
import { newError } from '../utils/ErrorUtils'

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
	.post('/product/bulk', async (req: Request, res: Response) => {
		await HandleBusinessResponseAsync(res, async () => {
			return await ValidateAndCreateProductBulk({
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
	.delete('/product/:id', async (req: Request, res: Response) => {
		await HandleBusinessResponseAsync(res, async () => {
			const productFound = await Database.product.findOne(req.params.id)
			if (!productFound) {
				throw newError('DATABASE-002')
			}
			await Database.product.remove(req.params.id)
			return
		})
	})
	.get('/product', async (req: Request, res: Response) => {
		const query: any = {
			user_id: (req as any).user.id,
		}
		if (req.query?.seller_id && req.query?.seller_id !== 'null') {
			query.seller_id = req.query?.seller_id
		}
		if (req.query?.general_search && req.query?.general_search !== 'null') {
			query.OR = [
				{
					title: { contains: req.query?.general_search },
				},
				{
					description: { contains: req.query?.general_search },
				},
				{
					code: { contains: req.query?.general_search },
				},
			]
		}
		if (req.query?.status && req.query?.status !== 'null') {
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
