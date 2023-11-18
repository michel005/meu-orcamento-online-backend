import fs from 'fs'
import { GetFileByTypeAndIdentifier } from './GetFileByTypeAndIdentifier'
import { GeneralConfiguration } from '../../config/GeneralConfiguration'

export const GetUrlByTypeAndIdentifier = (type: string, identifier: string, userId?: string) => {
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
