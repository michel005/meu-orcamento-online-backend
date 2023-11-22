import { useSchemaValidation } from '../hooks/useSchemaValidation'

export const ProductSchema = useSchemaValidation({
	id: {
		mandatory: false,
	},
	created: {
		mandatory: false,
	},
	updated: {
		mandatory: false,
	},
	user_id: {
		mandatory: false,
	},
	seller_id: {
		mandatory: false,
	},
	code: {
		mandatory: true,
	},
	title: {
		mandatory: true,
	},
	description: {
		mandatory: false,
	},
	categories: {
		mandatory: false,
	},
	price: {
		mandatory: true,
	},
	status: {
		mandatory: true,
	},
})
