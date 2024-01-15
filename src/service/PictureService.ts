import path from 'path'
import fs from 'fs'
import { ErrorUtils } from '../utils/ErrorUtils'

const BASE_PATH = 'C:\\Desenvolvimento\\imagens'

export class PictureService {
	static save = (buffer: string, type: string, id: string, userName?: string) => {
		let finalPath = this.getFilePath(type, id, userName)

		if (!finalPath || !userName) {
			return
		}
		console.log({ finalPath })
		if (!this.haveFile(type, id, userName)) {
			if (type === 'user') {
				fs.mkdirSync(path.join(BASE_PATH, id), {
					recursive: true,
				})
			} else {
				fs.mkdirSync(path.join(BASE_PATH, userName, type), {
					recursive: true,
				})
			}
		}

		fs.writeFileSync(
			finalPath,
			Buffer.from(buffer.replace(/^data:image\/\w+;base64,/, ''), 'base64')
		)
	}

	static remove = (type: string, id: string, userName?: string) => {
		let finalPath = this.getFilePath(type, id, userName)
		if (!finalPath || !fs.existsSync(finalPath)) {
			throw ErrorUtils.getError('PICTURE-001')
		}
		fs.rmSync(finalPath)
	}

	static haveFile = (type: string, id: string, userName?: string) => {
		let finalPath = this.getFilePath(type, id, userName)
		return finalPath && fs.existsSync(finalPath)
	}

	static getUrl = (
		type: string,
		id: string,
		timestamp: string = new Date().getTime().toString()
	) => {
		return `http://localhost:8080/api/picture/${type}/${id}`
	}

	static getFilePath = (type: string, id: string, userName?: string) => {
		let finalPath
		if (type === 'user') {
			finalPath = path.join(BASE_PATH, id, `profile.png`)
		} else if (userName) {
			finalPath = path.join(BASE_PATH, userName, type, `${id}.png`)
		} else {
			return null
		}
		return finalPath
	}
}
