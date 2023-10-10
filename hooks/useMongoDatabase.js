import { ObjectId } from 'mongodb'

export const useMongoDatabase = (database, entity) => {
	const collection = database.collection(entity)

	const findAll = () => {
		try {
			return collection.find({}).toArray()
		} catch (error) {
			return []
		}
	}

	const findMany = async (query) => {
		try {
			return collection.find(query).toArray()
		} catch (error) {
			return []
		}
	}

	const findOne = async (id) => {
		try {
			return (await collection.find({ _id: new ObjectId(id) }).toArray())?.[0]
		} catch (error) {
			return null
		}
	}

	const create = async (value) => {
		const response = await collection.insertOne(value)
		if (response?.insertedId) {
			return await findOne(response?.insertedId)
		}
	}

	const update = async (id, value) => {
		await collection.updateOne({ _id: new ObjectId(id) }, { $set: value })
		return await findOne(id)
	}

	const remove = (id) => {
		return collection.deleteOne({ _id: new ObjectId(id) })
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
