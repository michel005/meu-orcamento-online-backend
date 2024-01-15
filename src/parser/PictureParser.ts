import { PictureService } from '../service/PictureService'
import { PictureType } from '../types/PictureType'

export const PictureParser = (
	content: any,
	type: string,
	id: string,
	userName?: string,
	timestamp?: string
): PictureType | undefined => {
	if (!content) {
		if (PictureService.haveFile(type, id, userName)) {
			return {
				value: PictureService.getUrl(type, id, timestamp),
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
