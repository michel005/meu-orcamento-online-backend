import { v4 as uuid } from 'uuid'
import { DateUtils } from '../utils/DateUtils.js'

const EVENTS = [
	'Cadastro de Produto',
	'Alteração de Produto',
	'Venda',
	'Recebimento de Valor',
	'Devolução de Estoque',
	'Devolução de Produtos',
	'Alteração Cadastral',
	'Cadastro',
]

const EVENTS_DESCRIPTION = [
	'Produto XXXX foi cadastrado com o valor R$ 230,00.',
	'O produto XXXX foi alterado de R$ 230,00 para R$ 450,00.',
	'Nova venda do produto XXXX por R$ 230,00.',
	'Novo valor recebido: R$ 200,00. Taxa administrativa: R$ 20,00. Valor a receber: R$ 180,00.',
	'O produto XXXX não foi vendido e será devolvido ao dono.',
	'O produto XXXX, que foi vendido, sera devolvido pelo cliente',
	'Houve uma alteração cadastral neste cliente',
	'Este cliente foi cadastrado com sucesso.',
]

export const FakeCustomerHistory = () => {
	const random = Math.round(Math.random() * 8)
	const baseDate = new Date(2023, Math.round(Math.random() * 5), 1)

	return {
		id: uuid(),
		date: DateUtils.dateToString(baseDate),
		event: EVENTS?.[random] || EVENTS[0],
		description: EVENTS_DESCRIPTION?.[random] || EVENTS_DESCRIPTION[0],
	}
}
