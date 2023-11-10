import { ValidateAndCreateUser } from './user/ValidateAndCreateUser.js'

const SendSuccess = (res) => {
	return (response) => {
		res.status(200).json(response)
	}
}

const SendError = (res) => {
	return (response, error = 400) => {
		res.status(error).json(response)
	}
}

export const HandleBusinessResponse = async (res, callback) => {
	try {
		await callback()
	} catch (err) {
		console.log(err)
		res.status(404).json(err)
	}
}

export const HandleBusinessResponseAsync = async (res, callback) => {
	try {
		res.status(200).json(await callback())
	} catch (err) {
		console.log(err)
		res.status(404).json(err)
	}
}

export const HandleBusinessFileResponseAsync = async (res, callback) => {
	try {
		res.status(200).sendFile(await callback())
	} catch (err) {
		console.log(err)
		res.status(404).json(err)
	}
}
