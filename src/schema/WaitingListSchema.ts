import { useSchemaValidation } from '../hooks/useSchemaValidation'

export const WaitingListSchema = useSchemaValidation({
	id: {
		mandatory: false,
	},
	created: {
		mandatory: false,
	},
	customer_id: {
		mandatory: false,
	},
	product_id: {
		mandatory: false,
	},
})
