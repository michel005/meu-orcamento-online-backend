import fs from 'fs'
import { GeneralConfiguration } from '../../config/GeneralConfiguration'

export const GetFileByTypeAndIdentifier = (type: string, identifier: string, userId?: string) => {
	if (type === 'user') {
		if (fs.existsSync(`${GeneralConfiguration.uploadDir}/${userId}/profile.png`)) {
			return String(
				fs.readFileSync(`${GeneralConfiguration.uploadDir}/${userId}/profile.png`)
			)
		} else {
			return null
		}
	} else {
		if (
			fs.existsSync(`${GeneralConfiguration.uploadDir}/${userId}/${type}/${identifier}.png`)
		) {
			return String(
				fs.readFileSync(
					`${GeneralConfiguration.uploadDir}/${userId}/${type}/${identifier}.png`
				)
			)
		} else {
			return null
		}
	}
}
