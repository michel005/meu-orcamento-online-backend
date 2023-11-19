import express, { Request, Response } from 'express'
import { HandleBusinessResponseAsync } from '../business/HandleBusinessResponse'
import { ValidateAndCreateCustomer } from '../business/customer/ValidateAndCreateCustomer'
import { ValidateAndUpdateCustomer } from '../business/customer/ValidateAndUpdateCustomer'
import { RemoveCustomerPrivateInformation } from '../business/customer/RemoveCustomerPrivateInformation'
import { newError } from '../utils/ErrorUtils'
import { GetUrlByTypeAndIdentifier } from '../business/files/GetUrlByTypeAndIdentifier'
import { CustomerType } from '../types/Customer.type'
import { Database } from '../middlewares/databases'

export const CustomerRoute = express
	.Router()
	.post('/customer', async (req: Request, res: Response) => {
		await HandleBusinessResponseAsync(res, async () => {
			return await ValidateAndCreateCustomer(req.body, (req as any).user)
		})
	})
	.put('/customer', async (req: Request, res: Response) => {
		await HandleBusinessResponseAsync(res, async () => {
			return await ValidateAndUpdateCustomer(req.body, (req as any).user)
		})
	})
	.delete('/customer/:id', async (req: Request, res: Response) => {
		await HandleBusinessResponseAsync(res, async () => {
			const foundedCustomer = await Database.customer.findOne(req.params.id)
			if (!foundedCustomer) {
				throw newError('DATABASE-002')
			}
			await Database.customer.remove(req.params.id)
			return
		})
	})
	.get('/customer', async (req: Request, res: Response) => {
		const allCustomers: CustomerType[] = await Database.customer.findMany({
			user_id: (req as any).user.id,
		})
		res.status(200).json(
			allCustomers
				.map((x) => {
					x.picture = GetUrlByTypeAndIdentifier(
						'customer',
						x.id as string,
						(req as any).user.id
					)
					x.user = undefined
					return { ...x }
				})
				.map((x) => RemoveCustomerPrivateInformation(x))
		)
	})