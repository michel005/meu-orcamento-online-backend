import fs from 'fs'

export const SendFileByTypeAndIdentifier = (type, identifier, content, userId) => {
	if (type === 'user') {
		try {
			fs.readdirSync(`./uploads/${identifier}`)
		} catch (err) {
			fs.mkdirSync(`./uploads/${identifier}`)
		}
		if (fs.existsSync(`./uploads/${identifier}/profile`)) {
			fs.rmSync(`./uploads/${identifier}/profile`)
		}
		fs.writeFileSync(`./uploads/${identifier}/profile`, content)
		return `./uploads/${identifier}/profile`
	} else {
		try {
			fs.readdirSync(`./uploads/${userId}/${type}`)
		} catch (err) {
			fs.mkdirSync(`./uploads/${userId}/${type}`)
		}
		if (fs.existsSync(`./uploads/${userId}/${type}/${identifier}`)) {
			fs.rmSync(`./uploads/${userId}/${type}/${identifier}`)
		}
		fs.writeFileSync(`./uploads/${userId}/${type}/${identifier}`, content)
		return `./uploads/${userId}/${type}/${identifier}`
	}
}
