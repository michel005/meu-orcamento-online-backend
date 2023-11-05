import { v4 as uuid } from 'uuid'

export const useMySQLDatabase = (prisma, entity, includes = []) => {
	const database = prisma[entity]

	const includesSection = includes.reduce((obj, x) => {
		obj[x] = true
		return obj
	}, {})

	const findAll = async () => {
		try {
			return await database.findMany({
				include: includesSection,
			})
		} catch (error) {
			console.error(error)
			return []
		}
	}

	const findMany = async (query) => {
		try {
			return await database.findMany({
				include: includesSection,
				where: query,
			})
		} catch (error) {
			console.error(error)
			return []
		}
	}

	const findOne = async (id) => {
		try {
			return (
				await database.findMany({
					include: includesSection,
					where: { id: id },
				})
			)?.[0]
		} catch (error) {
			console.error(error)
			return null
		}
	}

	const create = async (value) => {
		return await database.create({
			data: {
				id: uuid(),
				...value,
			},
		})
	}

	const update = async (id, value) => {
		return await database.update({
			where: { id: id },
			data: value,
		})
	}

	const remove = async (id) => {
		return await database.delete({ where: { id: id } })
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
