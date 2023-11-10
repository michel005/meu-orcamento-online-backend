import fs from 'fs'
import { GetFileByTypeAndIdentifier } from './GetFileByTypeAndIdentifier.js'
import { GeneralConfiguration } from '../../config/GeneralConfiguration.js'

export const GetUrlByTypeAndIdentifier = (type, identifier, userId) => {
	const haveImage = GetFileByTypeAndIdentifier(type, identifier, userId)
	if (haveImage) {
		if (type === 'user') {
			return `http://${GeneralConfiguration.mainURL}:${GeneralConfiguration.port}/api/file/user/${identifier}`
		} else {
			return `http://${GeneralConfiguration.mainURL}:${GeneralConfiguration.port}/api/file/${type}/${identifier}`
		}
	} else {
		return null
	}
}
