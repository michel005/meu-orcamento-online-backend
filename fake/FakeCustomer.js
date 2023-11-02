import { v4 as uuid } from 'uuid'

export const FakeCustomer = () => {
	const random = Math.round(Math.random() * 90)
	const sex = random >= 50 ? 'men' : 'women'
	const personType = Math.round(Math.random() * 100) >= 50 ? 'PF' : 'PJ'

	return {
		id: uuid(),
		picture:
			Math.round(Math.random() * 50) > 10
				? `https://randomuser.me/api/portraits/${sex}/${
						random === 6 || random === 59 ? 100 : random
				  }.jpg`
				: null,
		name: sex === 'men' ? `José da Silva Gomes ${random}` : `Martina Andrade ${random}`,
		email: sex === 'men' ? `jose_${random}@hotmail.com` : `martina_${random}@hotmail.com`,
		phone: '(44) 99999-9999',
		birthday: '01/01/2000',
		person_type: personType,
		document_type: personType === 'PF' ? 'CPF' : 'CNPJ',
		document_number:
			personType === 'PF'
				? Math.round(Math.random() * 99999999999)
				: Math.round(Math.random() * 99999999999999),
		active: Math.round(Math.random() * 50) > 5,
		favorite: Math.round(Math.random() * 50) < 5,
		address: {
			zip_code:
				Math.round(Math.random() * 99999)
					.toString()
					.padStart(5, '0') +
				'-' +
				Math.round(Math.random() * 999)
					.toString()
					.padStart(3, '0'),
			street_name: 'Rua dos Alfeneiros',
			street_number: Math.round(Math.random() * 999),
			complement: 'Perto da esquina',
			city: 'Maringá',
			state: 'Paraná',
			country: 'Brasil',
		},
	}
}
