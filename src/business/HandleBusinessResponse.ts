import { Response } from 'express'

export const HandleBusinessResponse = async (res: Response, callback: () => Promise<any>) => {
	try {
		await callback()
	} catch (err) {
		console.log(err)
		res.status(404).json(err)
	}
}

export const HandleBusinessResponseAsync = async (res: Response, callback: () => Promise<any>) => {
	try {
		res.status(200).json(await callback())
	} catch (err) {
		console.log(err)
		res.status(404).json(err)
	}
}

export const HandleBusinessFileResponseAsync = async (
	res: Response,
	callback: () => Promise<any>
) => {
	try {
		res.status(200).sendFile(await callback())
	} catch (err) {
		console.log(err)
		res.status(404).json(err)
	}
}
