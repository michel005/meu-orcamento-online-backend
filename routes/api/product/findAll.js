import { v4 as uuid } from 'uuid'

export const FindAll = (app) => {
	app.get('/api/product', (req, res) => {
		res.status(200).json(
			new Array(30).fill({
				name: 'Produto de Exemplo',
				picture:
					'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRY-nRnO0pi_0dDMdbBst2xnwSi-qkmTV9O0T0DhU92s1SuDVYsKWNRKkQQPTQFi3E69uVybptlBjZgbopHBLgtobITwwEC9ACSvSGiNIrtOs24NnjSTUJ5&usqp=CAE',
				description: 'Exemplo de descrição para um produto.',
				code: uuid(),
				customer_id: uuid(),
				categories: 'Categoria1;Categoria2',
				price: 12,
			})
		)
	})
}
