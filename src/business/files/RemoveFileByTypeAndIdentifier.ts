import fs from 'fs'
import { GeneralConfiguration } from '../../config/GeneralConfiguration'

export const RemoveFileByTypeAndIdentifier = (
	type: string,
	identifier: string,
	userId?: string
) => {
	if (type === 'user') {
		if (fs.existsSync(`${GeneralConfiguration.uploadDir}/${identifier}/profile.png`)) {
			fs.rmSync(`${GeneralConfiguration.uploadDir}/${identifier}/profile.png`)
		}
	} else {
		if (
			fs.existsSync(`${GeneralConfiguration.uploadDir}/${userId}/${type}/${identifier}.png`)
		) {
			fs.rmSync(`${GeneralConfiguration.uploadDir}/${userId}/${type}/${identifier}.png`)
		}
	}
}
