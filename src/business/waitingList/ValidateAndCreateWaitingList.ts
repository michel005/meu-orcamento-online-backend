import { DateUtils } from '../../utils/DateUtils'
import { Database } from '../../middlewares/databases'
import { WaitingListType } from '../../types/WaitingList.type'
import { WaitingListSchema } from '../../schema/WaitingListSchema'

export const ValidateAndCreateWaitingList = async ({ data }: { data: WaitingListType }) => {
	const value: WaitingListType = {
		...data,
		created: DateUtils.dateTimeToString(new Date()),
	}

	let errors: any = {}
	const waitingListValidation = WaitingListSchema.validate(value)
	if (waitingListValidation.hasError) {
		errors.waitingList = waitingListValidation.errors
	}
	if (Object.keys(errors).length > 0) {
		throw errors
	}

	const newWaitingList = await Database.waitingList.create(value)

	return {
		waitingList: newWaitingList,
	}
}
