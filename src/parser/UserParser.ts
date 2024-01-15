import { UserType } from '../types/UserType'
import { AddressParser } from './AddressParser'
import { PictureService } from '../service/PictureService'
import { PictureParser } from './PictureParser'

export const UserParser = (content: any, hidePrivate = false): UserType => {
	const user: UserType = {}
	if (!hidePrivate) {
		user._id = content?._id || undefined
		user.password = content?.password || undefined
	}
	user.created = content?.created || undefined
	user.updated = content?.updated || undefined
	user.full_name = content?.full_name || undefined
	user.user_name = content?.user_name || undefined
	user.email = content?.email || undefined
	user.phone = content?.phone || undefined
	user.birthday = content?.birthday || undefined
	user.person_type = content?.person_type || undefined
	user.document_type = content?.document_type || undefined
	user.document_number = content?.document_number || undefined
	user.picture = PictureParser(
		content.picture,
		'user',
		content.user_name,
		content.user_name,
		content.updated || content.created
	)
	user.address = AddressParser(content?.address || {})
	return user
}
