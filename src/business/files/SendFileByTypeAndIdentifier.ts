import fs from 'fs'
import { GetUrlByTypeAndIdentifier } from './GetUrlByTypeAndIdentifier'
import { GeneralConfiguration } from '../../config/GeneralConfiguration'

export const SendFileByTypeAndIdentifier = (
	type: string,
	identifier: string,
	content: any,
	userId?: string
) => {
	if (!fs.existsSync(GeneralConfiguration.uploadDir)) {
		fs.mkdirSync(GeneralConfiguration.uploadDir)
	}
	if (type === 'user') {
		if (!fs.existsSync(`${GeneralConfiguration.uploadDir}/${identifier}`)) {
			fs.mkdirSync(`${GeneralConfiguration.uploadDir}/${identifier}`)
		}
		if (fs.existsSync(`${GeneralConfiguration.uploadDir}/${identifier}/profile`)) {
			fs.rmSync(`${GeneralConfiguration.uploadDir}/${identifier}/profile`)
		}
		fs.writeFileSync(
			`${GeneralConfiguration.uploadDir}/${identifier}/profile.png`,
			Buffer.from(content.replace('data:', '').replace(/^.+,/, ''), 'base64')
		)
	} else {
		if (!fs.existsSync(`${GeneralConfiguration.uploadDir}/${userId}`)) {
			fs.mkdirSync(`${GeneralConfiguration.uploadDir}/${userId}`)
		}
		if (!fs.existsSync(`${GeneralConfiguration.uploadDir}/${userId}/${type}`)) {
			fs.mkdirSync(`${GeneralConfiguration.uploadDir}/${userId}/${type}`)
		}
		if (fs.existsSync(`${GeneralConfiguration.uploadDir}/${userId}/${type}/${identifier}`)) {
			fs.rmSync(`${GeneralConfiguration.uploadDir}/${userId}/${type}/${identifier}`)
		}
		fs.writeFileSync(
			`${GeneralConfiguration.uploadDir}/${userId}/${type}/${identifier}.png`,
			Buffer.from(content.replace('data:', '').replace(/^.+,/, ''), 'base64')
		)
	}
	return GetUrlByTypeAndIdentifier(type, identifier, userId)
}
