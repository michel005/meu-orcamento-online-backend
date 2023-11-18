import { QueryOptions } from '@prisma/client/runtime/library'
import { v4 as uuid } from 'uuid'

export type useMySQLDatabaseReturnType<T> = {
	database: any
	findAll: () => Promise<T[]>
	findMany: (query: any) => Promise<T[]>
	findOne: (id: string) => Promise<T | undefined>
	create: (value: T) => Promise<T>
	update: (id: string, value: T) => Promise<T>
	remove: (id: string) => Promise<T>
}

export const useMySQLDatabase = <T>(
	database: any,
	includes: string[] = []
): useMySQLDatabaseReturnType<T> => {
	const includesSection = includes.reduce((obj, x) => {
		;(obj as any)[x] = true
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

	const findMany = async (query: any) => {
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
				id: uuid(),
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

	return {
		findAll,
		findMany,
		findOne,
		create,
		update,
		remove,
		database,
	}
}
