import express from 'express'
import { Db, ObjectId } from 'mongodb'
import { CustomerParser } from '../parser/CustomerParser'
import { CustomerService } from '../service/CustomerService'
import { CustomerType } from '../types/CustomerType'
import { BusinessRouteProcessor } from '../utils/BusinessRouteProcessor'
import { ErrorUtils } from '../utils/ErrorUtils'

export const CustomerRoute = () => {
	return express
		.Router()
		.post('/customer', (req, res) => {
			BusinessRouteProcessor(res, async () => {
				return await CustomerService.create({
					customer: req.body,
					currentUser: (req as any).user,
				})
			})
		})
		.put('/customer', (req, res) => {
			BusinessRouteProcessor(res, async () => {
				if (!ObjectId.isValid(req.query.id as string)) {
					throw ErrorUtils.getError('VALIDATION-004')
				}
				return await CustomerService.update({
					id: new ObjectId(req.query.id as string),
					currentUser: (req as any).user,
					customer: req.body,
				})
			})
		})
		.put('/customer/prop/:propName/:propValue', (req, res) => {
			BusinessRouteProcessor(res, async () => {
				if (!ObjectId.isValid(req.query.id as string)) {
					throw ErrorUtils.getError('VALIDATION-004')
				}
				return await CustomerService.updateProperty({
					id: new ObjectId(req.query.id as string),
					currentUser: (req as any).user,
					propName: req.params.propName,
					propValue: req.params.propValue,
				})
			})
		})
		.delete('/customer', (req, res) => {
			BusinessRouteProcessor(res, async () => {
				if (!ObjectId.isValid(req.query.id as string)) {
					throw ErrorUtils.getError('VALIDATION-004')
				}
				await CustomerService.remove({
					id: new ObjectId(req.query.id as string),
					currentUser: (req as any).user,
				})
			})
		})
		.get('/customer', (req, res) => {
			BusinessRouteProcessor(res, async () => {
				return await CustomerService.getAll({
					currentUser: (req as any).user,
					personType: null,
				})
			})
		})
}
