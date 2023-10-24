import { v4 as uuid } from 'uuid'

export const useMysqlDatabase = (database, entity) => {
	const findAll = (onSuccess, onError) => {
		database.query(`select * from ${entity}`, (err, result) => {
			if (err) {
				onError?.(err)
			} else {
				onSuccess?.(result)
			}
		})
	}

	const findMany = (query, onSuccess, onError) => {
		database.query(`select * from ${entity} where ?`, query, (err, result) => {
			if (err) {
				onError?.(err)
			} else {
				onSuccess?.(result)
			}
		})
	}

	const findOne = (id, onSuccess, onError) => {
		database.query(`select * from ${entity} where id = ?`, id, (err, result) => {
			if (err) {
				onError?.(err)
			} else {
				if (result.length > 0) {
					onSuccess?.(result?.[0])
				} else {
					onError?.('Record not found')
				}
			}
		})
	}

	const create = (value, onSuccess, onError) => {
		const id = uuid()
		database.query(
			`insert into ${entity} set ?`,
			{
				...value,
				id,
			},
			(err) => {
				if (err) {
					onError?.(err)
				} else {
					findOne(id, onSuccess, onError)
				}
			}
		)
	}

	const update = (id, value, onSuccess, onError) => {
		database.query(`update ${entity} set ? where id = ?`, [value, id], (err) => {
			if (err) {
				onError?.(err)
			} else {
				findOne(id, onSuccess, onError)
			}
		})
	}

	const remove = (id, onSuccess, onError) => {
		database.query(`delete from  ${entity} where id = ?`, id, (err) => {
			if (err) {
				onError?.(err)
			} else {
				findOne(id, onSuccess, onError)
			}
		})
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
