import fs from 'fs'

export const RemoveFileByTypeAndIdentifier = (type, identifier, userId) => {
	if (type === 'user') {
		if (fs.existsSync(`./uploads/${identifier}/profile`)) {
			fs.rmSync(`./uploads/${identifier}/profile`)
		}
	} else {
		if (fs.existsSync(`./uploads/${userId}/${type}/${identifier}`)) {
			fs.rmSync(`./uploads/${userId}/${type}/${identifier}`)
		}
	}
}
