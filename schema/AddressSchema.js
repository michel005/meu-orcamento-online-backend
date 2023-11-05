import { useSchemaValidation } from '../hooks/useSchemaValidation.js'

export const AddressSchema = useSchemaValidation({
	id: {
		mandatory: false,
	},
	zip_code: {
		mandatory: false,
	},
	street_number: {
		mandatory: false,
	},
	street_name: {
		mandatory: false,
	},
	complement: {
		mandatory: false,
	},
	city: {
		mandatory: true,
	},
	state: {
		mandatory: true,
	},
	country: {
		mandatory: true,
	},
})
