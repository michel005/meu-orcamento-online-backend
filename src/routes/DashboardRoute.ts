import express from 'express'
import { BusinessRouteProcessor } from '../utils/BusinessRouteProcessor'
import { DashboardService } from '../service/DashboardService'

export const DashboardRoute = () => {
	return express.Router().get('/dashboard/sellingByMonth/:month/:year', (req, res) => {
		BusinessRouteProcessor(res, async () => {
			return DashboardService.sellingByMonth(+req.params.month, +req.params.year)
		})
	})
}
