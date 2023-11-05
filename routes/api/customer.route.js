import express from 'express'
import { HandleBusinessResponseAsync } from '../../business/HandleBusinessResponse.js'
import { ValidateAndCreateCustomer } from '../../business/customer/ValidateAndCreateCustomer.js'
import { ValidateAndUpdateCustomer } from '../../business/customer/ValidateAndUpdateCustomer.js'
import { RemoveCustomerPrivateInformation } from '../../business/customer/RemoveCustomerPrivateInformation.js'
import { newError } from '../../utils/ErrorUtils.js'
import { GetFileByTypeAndIdentifier } from '../../business/files/GetFileByTypeAndIdentifier.js'

export const CustomerRoute = express
	.Router()
	.post('/api/customer', async (req, res) => {
		await HandleBusinessResponseAsync(res, async () => {
			return await ValidateAndCreateCustomer(req.database, req.body, req.user)
		})
	})
	.put('/api/customer', async (req, res) => {
		await HandleBusinessResponseAsync(res, async () => {
			return await ValidateAndUpdateCustomer(req.database, req.body, req.user)
		})
	})
	.delete('/api/customer/:id', async (req, res) => {
		await HandleBusinessResponseAsync(res, async () => {
			const findedCustomer = await req.database.customer.findOne(req.params.id)
			if (!findedCustomer) {
				throw newError('DATABASE-002')
			}
			await req.database.customer.remove(req.params.id)
			return
		})
	})
	.get('/api/customer', async (req, res) => {
		const allCustomers = await req.database.customer.findMany({ user_id: req.user.id })
		res.status(200).json(
			allCustomers
				.map((x) => {
					x.picture = GetFileByTypeAndIdentifier('customer', x.id, req.user.id)
					x.user = undefined
					return { ...x }
				})
				.map((x) => RemoveCustomerPrivateInformation(x))
		)
	})
