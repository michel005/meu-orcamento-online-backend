import { v4 as uuid } from 'uuid'

export type useMySQLDatabaseReturnType<T> = {
	database: any
	findAll: (sort?: any) => Promise<T[]>
	findMany: (query: any, sort?: any) => Promise<T[]>
	findOne: (id: string) => Promise<T | undefined>
	create: (value: T) => Promise<T>
	update: (id: string, value: T) => Promise<T>
	remove: (id: string) => Promise<T>
	removeByQuery: (query: any) => Promise<T>
}

export const useMySQLDatabase = <T>(
	database: any,
	includes: string[] = [],
	autoIncrement: boolean = false
): useMySQLDatabaseReturnType<T> => {
	const includesSection = includes.reduce((obj, x) => {
		;(obj as any)[x] = true
		return obj
	}, {})

	const findAll = async (sort?: any) => {
		try {
			return await database.findMany({
				include: includesSection,
				orderBy: sort,
			})
		} catch (error) {
			console.error(error)
			return []
		}
	}

	const findMany = async (query: any, sort?: any) => {
		try {
			return await database.findMany({
				include: includesSection,
				where: query,
				orderBy: sort,
			})
		} catch (error) {
			console.error(error)
			return []
		}
	}

	const findOne = async (id: string) => {
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

	const create = async (value: T) => {
		return await database.create({
			data: {
				id: autoIncrement ? undefined : uuid(),
				...value,
			},
		})
	}

	const update = async (id: string, value: T) => {
		return await database.update({
			where: { id: id },
			data: value,
		})
	}

	const remove = async (id: string) => {
		return await database.delete({ where: { id: id } })
	}

	const removeByQuery = async (query: any) => {
		return await database.delete({ where: query })
	}

	return {
		findAll,
		findMany,
		findOne,
		create,
		update,
		remove,
		removeByQuery,
		database,
	}
}
