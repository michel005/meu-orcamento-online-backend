import { useSchemaValidation } from '../hooks/useSchemaValidation.js'

export const ProductSchema = useSchemaValidation({
	_id: {
		mandatory: false,
	},
	created: {
		mandatory: true,
	},
	updated: {
		mandatory: false,
	},
	user_id: {
		mandatory: false,
	},
	customer_id: {
		mandatory: false,
	},
	picture: {
		mandatory: false,
	},
	code: {
		mandatory: true,
	},
	qrcode: {
		mandatory: false,
	},
	name: {
		mandatory: true,
	},
	description: {
		mandatory: false,
	},
	categories: {
		mandatory: false,
	},
	hashtags: {
		mandatory: false,
	},
	price: {
		mandatory: true,
	},
})
