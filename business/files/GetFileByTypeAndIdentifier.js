import fs from 'fs'

export const GetFileByTypeAndIdentifier = (type, identifier, userId) => {
	if (type === 'user') {
		if (fs.existsSync(`./uploads/${identifier}/profile`)) {
			return String(fs.readFileSync(`./uploads/${identifier}/profile`))
		} else {
			return null
		}
	} else {
		if (fs.existsSync(`./uploads/${userId}/${type}/${identifier}`)) {
			return String(fs.readFileSync(`./uploads/${userId}/${type}/${identifier}`))
		} else {
			return null
		}
	}
}
