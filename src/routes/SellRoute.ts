import express from 'express'
import { ObjectId } from 'mongodb'
import { ProductService } from '../service/ProductService'
import { BusinessRouteProcessor } from '../utils/BusinessRouteProcessor'
import { ErrorUtils } from '../utils/ErrorUtils'
import { SellService } from '../service/SellService'

export const SellRoute = () => {
	return express
		.Router()
		.post('/sell', (req, res) => {
			BusinessRouteProcessor(res, async () => {
				return await SellService.create({
					sell: req.body,
					currentUser: (req as any).user,
				})
			})
		})
		.put('/sell', (req, res) => {
			BusinessRouteProcessor(res, async () => {
				if (!ObjectId.isValid(req.query.id as string)) {
					throw ErrorUtils.getError('VALIDATION-004')
				}
				return await SellService.update({
					id: new ObjectId(req.query.id as string),
					currentUser: (req as any).user,
					sell: req.body,
				})
			})
		})
		.delete('/sell', (req, res) => {
			BusinessRouteProcessor(res, async () => {
				if (!ObjectId.isValid(req.query.id as string)) {
					throw ErrorUtils.getError('VALIDATION-004')
				}
				await SellService.remove({
					id: new ObjectId(req.query.id as string),
					currentUser: (req as any).user,
				})
			})
		})
		.get('/sell', (req, res) => {
			BusinessRouteProcessor(res, async () => {
				return await SellService.getAll({
					currentUser: (req as any).user,
				})
			})
		})
}
