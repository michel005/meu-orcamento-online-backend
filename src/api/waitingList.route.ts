import express, { Request, Response } from 'express'
import { HandleBusinessResponseAsync } from '../business/HandleBusinessResponse'
import { ValidateAndCreateProduct } from '../business/product/ValidateAndCreateProduct'
import { GetUrlByTypeAndIdentifier } from '../business/files/GetUrlByTypeAndIdentifier'
import { Database } from '../middlewares/databases'
import { RemoveCustomerPrivateInformation } from '../business/customer/RemoveCustomerPrivateInformation'
import { ValidateAndUpdateProduct } from '../business/product/ValidateAndUpdateProduct'
import { RemoveProductPrivateInformation } from '../business/product/RemoveProductPrivateInformation'
import { newError } from '../utils/ErrorUtils'
import { RemoveWaitingListPrivateInformation } from '../business/waitingList/RemoveWaitingListPrivateInformation'
import { ValidateAndCreateWaitingList } from '../business/waitingList/ValidateAndCreateWaitingList'

export const WaitingListRoute = express
	.Router()
	.post('/waitingList', async (req: Request, res: Response) => {
		await HandleBusinessResponseAsync(res, async () => {
			return await ValidateAndCreateWaitingList({
				data: req.body,
			})
		})
	})
	.delete('/waitingList', async (req: Request, res: Response) => {
		await HandleBusinessResponseAsync(res, async () => {
			if (!req.query?.product) {
				throw newError('WAITING-LIST-001')
			}
			if (!req.query?.customer) {
				throw newError('WAITING-LIST-002')
			}
			const waitingListFound = await Database.waitingList.findMany({
				product_id: req.query?.product,
				customer_id: req.query?.customer,
			})
			if (waitingListFound.length > 0) {
				await Database.waitingList.remove(waitingListFound[0].id as string)
			}
			return
		})
	})
	.get('/waitingList', async (req: Request, res: Response) => {
		await HandleBusinessResponseAsync(res, async () => {
			if (!req.query?.product) {
				throw newError('WAITING-LIST-001')
			}
			return (
				await Database.waitingList.findMany(
					{ product_id: req.query?.product },
					{ id: 'asc' }
				)
			).map((x) => {
				return RemoveWaitingListPrivateInformation(x)
			})
		})
	})
