import { PictureService } from '../service/PictureService'
import { PictureType } from '../types/PictureType'

export const PictureParser = (content: any, type: string, id: string): PictureType | undefined => {
	if (!content) {
		if (PictureService.haveFile(type, id)) {
			return {
				value: PictureService.getUrl(type, id),
				type: 'url',
			}
		} else {
			return undefined
		}
	} else {
		return {
			value: content?.value,
			type: content?.type,
		}
	}
}
