import express from 'express'
import { ObjectId } from 'mongodb'
import { ProductService } from '../service/ProductService'
import { BusinessRouteProcessor } from '../utils/BusinessRouteProcessor'
import { ErrorUtils } from '../utils/ErrorUtils'

export const ProductRoute = () => {
	return express
		.Router()
		.post('/product', (req, res) => {
			BusinessRouteProcessor(res, async () => {
				return await ProductService.create({
					product: req.body,
					currentUser: (req as any).user,
				})
			})
		})
		.post('/product/bulk', (req, res) => {
			BusinessRouteProcessor(res, async () => {
				return await ProductService.create({
					product: req.body,
					currentUser: (req as any).user,
				})
			})
		})
		.put('/product', (req, res) => {
			BusinessRouteProcessor(res, async () => {
				if (!ObjectId.isValid(req.query.id as string)) {
					throw ErrorUtils.getError('VALIDATION-004')
				}
				return await ProductService.update({
					id: new ObjectId(req.query.id as string),
					currentUser: (req as any).user,
					product: req.body,
				})
			})
		})
		.delete('/product', (req, res) => {
			BusinessRouteProcessor(res, async () => {
				if (!ObjectId.isValid(req.query.id as string)) {
					throw ErrorUtils.getError('VALIDATION-004')
				}
				await ProductService.remove({
					id: new ObjectId(req.query.id as string),
					currentUser: (req as any).user,
				})
			})
		})
		.get('/product', (req, res) => {
			BusinessRouteProcessor(res, async () => {
				return await ProductService.getAll({
					currentUser: (req as any).user,
				})
			})
		})
}
