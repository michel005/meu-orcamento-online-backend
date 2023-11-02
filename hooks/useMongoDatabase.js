import { v4 as uuid } from 'uuid'

export const useMongoDatabase = (database, entity) => {
	const collection = database.collection(entity)

	const findAll = async () => {
		try {
			return await collection.find({}).toArray()
		} catch (error) {
			console.error(error)
			return []
		}
	}

	const findMany = async (query) => {
		try {
			return await collection.find(query).toArray()
		} catch (error) {
			console.error(error)
			return []
		}
	}

	const findOne = async (id) => {
		try {
			return (await collection.find({ _id: id }).toArray())?.[0]
		} catch (error) {
			console.error(error)
			return null
		}
	}

	const create = async (value) => {
		const generatedId = uuid()
		await collection.insertOne({
			...value,
			_id: generatedId,
		})
		return await findOne(generatedId)
	}

	const update = async (id, value) => {
		await collection.updateOne({ _id: id }, { $set: value })
		return await findOne(id)
	}

	const remove = async (id) => {
		return await collection.deleteOne({ _id: id })
	}

	return {
		findAll,
		findMany,
		findOne,
		create,
		update,
		remove,
	}
}
