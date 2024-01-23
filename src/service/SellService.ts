import { Collection, ObjectId } from 'mongodb'
import { ProductBusiness } from '../business/ProductBusiness'
import { ProductParser } from '../parser/ProductParser'
import { ProductType } from '../types/ProductType'
import { UserType } from '../types/UserType'
import { DateUtils } from '../utils/DateUtils'
import { ErrorUtils } from '../utils/ErrorUtils'
import { PictureType } from '../types/PictureType'
import { PictureService } from './PictureService'
import { CustomerService } from './CustomerService'
import { SellType } from '../types/SellType'
import { SellParser } from '../parser/SellParser'

export class SellService {
	static sellDatabase: Collection<SellType>

	static create = async ({ sell, currentUser }: { sell: SellType; currentUser: UserType }) => {
		const insertedProduct = await SellService.sellDatabase.insertOne({
			created: DateUtils.dateTimeToString(new Date()),
			customer_id: sell.customer_id,
			finalPrice: sell?.finalPrice,
			items: sell?.items,
			status: sell?.status,
			user_id: currentUser._id,
		})

		const refreshSell = await SellService.sellDatabase.findOne({
			_id: insertedProduct.insertedId,
		})
		return SellParser({ content: refreshSell })
	}

	static update = async ({
		id,
		sell,
		currentUser,
	}: {
		id: ObjectId
		sell: SellType
		currentUser: UserType
	}) => {
		const savedSell = await SellService.sellDatabase.findOne({
			_id: id,
			user_id: currentUser._id,
		})
		if (!savedSell) {
			throw ErrorUtils.getError('SELL-001')
		}
		await SellService.sellDatabase.updateOne(
			{
				_id: id,
			},
			{
				$set: {
					customer_id: sell.customer_id,
					finalPrice: sell?.finalPrice,
					status: sell?.status,
					items: sell?.items,
					updated: DateUtils.dateTimeToString(new Date()),
				},
			}
		)
		const updatedSell = await SellService.sellDatabase.findOne({
			_id: id,
			user_id: currentUser._id,
		})
		return SellParser({ content: updatedSell })
	}

	static remove = async ({ id, currentUser }: { id: ObjectId; currentUser: UserType }) => {
		const savedSell = await SellService.sellDatabase.findOne({
			_id: id,
			user_id: currentUser._id,
		})
		if (!savedSell) {
			throw ErrorUtils.getError('SELL-001')
		}
		await SellService.sellDatabase.deleteOne({
			_id: id,
		})
	}

	static getAll = async ({ currentUser }: { currentUser: UserType }) => {
		let allSells = await SellService.sellDatabase.find().toArray()

		const response = []
		for (const sell of allSells) {
			response.push(SellParser({ content: sell }))
		}
		return response
	}
}
