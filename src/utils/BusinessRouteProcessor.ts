import { ObjectId } from 'mongodb'

export const BusinessRouteProcessor = (res: any, callback: any) => {
	callback()
		.then((response: any) => {
			res.status(200).json(response)
		})
		.catch((response: any) => {
			console.log({ response })
			res.status(400).json(response)
		})
}
