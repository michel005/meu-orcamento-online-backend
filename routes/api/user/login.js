import { v4 as uuid } from 'uuid'

export const Login = (app) => {
	app.post('/api/user/login', async (req, res) => {
		res.status(200).json({
			user_name: 'michel005',
			full_name: 'Michel Douglas Grigoli',
			birthday: '19/12/1991',
			picture:
				'https://scontent.fmgf12-1.fna.fbcdn.net/v/t39.30808-6/289496236_746367823173716_2210883329402350598_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHTB26XvbA9VEnUAauMcQMj2zURluzDiXLbNRGW7MOJcpVmvBU3fnCoYwJqstmzuhL8OgkUA21_ZzcgQdmd2uZj&_nc_ohc=TI4rE1pKLf0AX9gVDmh&_nc_ht=scontent.fmgf12-1.fna&oh=00_AfBk-CqCXn8YG0cdDYl9sX9o4RXHrDg3E91O01d2Hzv9Xg&oe=653CCC8A',
			email: 'mdgrigoli@hotmail.com.br',
			token: uuid(),
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
