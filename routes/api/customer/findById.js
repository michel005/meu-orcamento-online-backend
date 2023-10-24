export const FindById = (app) => {
	app.get('/api/customer/:id', (req, res) => {
		res.status(200).json({
			name: 'José da Silva Gomes',
			picture: 'https://randomuser.me/api/portraits/men/7.jpg',
			email: 'jose@hotmail.com',
			phone: '(44) 99999-9999',
			birthday: '01/01/2000',
			person_type: 'PF',
			document_type: 'CPF',
			document_number: '99999999999',
			address: {
				zip_code: '99999-999',
				street_name: 'Rua dos Alfeneiros',
				street_number: '999',
				complement: 'Perto da esquina',
				city: 'Maringá',
				state: 'Paraná',
				country: 'Brasil',
			},
		})
	})
}
