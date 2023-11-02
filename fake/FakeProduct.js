import { v4 as uuid } from 'uuid'
import { FakeCustomer } from './FakeCustomer.js'

const RANDOM_PRODUCT_PICTURES = [
	'https://i.pinimg.com/564x/69/38/57/69385750feadedcedaa97ab1d0c07fe1.jpg',
	'https://i.pinimg.com/564x/0c/63/d5/0c63d580205766062e768afde28ccc62.jpg',
	'https://i.pinimg.com/564x/9f/96/7b/9f967b78da3c05be684051e67833e707.jpg',
	'https://i.pinimg.com/564x/0e/43/16/0e4316b4944b4716bed9c24d8efe9bf6.jpg',
	'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRY-nRnO0pi_0dDMdbBst2xnwSi-qkmTV9O0T0DhU92s1SuDVYsKWNRKkQQPTQFi3E69uVybptlBjZgbopHBLgtobITwwEC9ACSvSGiNIrtOs24NnjSTUJ5&usqp=CAE',
]

const POSSIBLE_STATUS = ['Disponível', 'Reservado', 'Vendido', 'Devolvido']

export const FakeProduct = () => {
	const status =
		POSSIBLE_STATUS?.[Math.round(Math.random() * POSSIBLE_STATUS.length - 1)] ||
		POSSIBLE_STATUS[0]
	return {
		id: uuid(),
		name: 'Produto de Exemplo',
		picture:
			RANDOM_PRODUCT_PICTURES?.[
				Math.round(Math.random() * RANDOM_PRODUCT_PICTURES.length - 1)
			] || RANDOM_PRODUCT_PICTURES[0],
		description:
			'Exemplo de descrição para um produto. Exemplo de descrição para um produto. Exemplo de descrição para um produto. Exemplo de descrição para um produto. Exemplo de descrição para um produto.',
		code: uuid(),
		customer_id: status === 'Disponível' || status === 'Devolvido' ? null : uuid(),
		customer: status === 'Disponível' || status === 'Devolvido' ? null : FakeCustomer(),
		categories: 'Categoria1;Categoria2',
		price: Math.round(Math.random() * 10000 + Math.random() * 1000 - Math.random() * 1000),
		status: status,
	}
}
