import path from 'path'
import fs from 'fs'
import { ErrorUtils } from '../utils/ErrorUtils'
import { DateUtils } from '../utils/DateUtils'

const BASE_PATH = 'C:\\Desenvolvimento\\imagens'

export class PictureService {
	static save = (buffer: string, type: string, id: string) => {
		const finalPath = path.join(BASE_PATH, type, `${id}.png`)
		fs.mkdirSync(path.join(BASE_PATH, type), {
			recursive: true,
		})

		fs.writeFileSync(
			finalPath,
			Buffer.from(buffer.replace(/^data:image\/\w+;base64,/, ''), 'base64')
		)
	}

	static remove = (type: string, id: string) => {
		const finalPath = path.join(BASE_PATH, type, `${id}.png`)
		if (!fs.existsSync(finalPath)) {
			throw ErrorUtils.getError('PICTURE-001')
		}
		fs.rmSync(finalPath)
	}

	static haveFile = (type: string, id: string) => {
		const finalPath = path.join(BASE_PATH, type, `${id}.png`)
		return fs.existsSync(finalPath)
	}

	static getUrl = (type: string, id: string) => {
		return `http://localhost:8080/api/picture/${type}/${id}?timestamp=${new Date().getTime()}`
	}

	static getFilePath = (type: string, id: string) => {
		return path.join(BASE_PATH, type, `${id}.png`)
	}
}
