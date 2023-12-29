import express from 'express'
import { ObjectId } from 'mongodb'
import { ProductParser } from '../parser/ProductParser'
import { ProductService } from '../service/ProductService'
import { ProductType } from '../types/ProductType'
import { BusinessRouteProcessor } from '../utils/BusinessRouteProcessor'
import { ErrorUtils } from '../utils/ErrorUtils'

export const ProductRoute = () => {
	return express
		.Router()
		.post('/product', (req, res) => {
			const value: ProductType = ProductParser({
				content: {
					...req.body,
					_id: undefined,
				},
				hideEntity: true,
			})
			BusinessRouteProcessor(res, async () => {
				return await ProductService.create({
					product: value,
					currentUser: (req as any).user,
				})
			})
		})
		.put('/product', (req, res) => {
			BusinessRouteProcessor(res, async () => {
				const value: ProductType = ProductParser({
					content: req.body,
					hideEntity: true,
				})
				if (!ObjectId.isValid(req.query.id as string)) {
					throw ErrorUtils.getError('VALIDATION-004')
				}
				return await ProductService.update({
					id: new ObjectId(req.query.id as string),
					currentUser: (req as any).user,
					product: value,
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
