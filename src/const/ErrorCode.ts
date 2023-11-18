export const ErrorCode: {
	[key: string]: string
} = {
	'AUTH-001': 'Token não encontrado',
	'AUTH-002': 'Token não é válido',
	'AUTH-003': 'Token expirado',
	'AUTH-004': 'Usuário/senha inválidos',
	'AUTH-005': 'Erro desconhecido',
	'SCHEMA-001': 'Campo inválido',
	'SCHEMA-002': 'Campo obrigatório não informado',
	'SCHEMA-003': 'Campo obrigatório não informado',
	'SCHEMA-004': 'Número inválido',
	'FIELD-001': 'Campo inválido',
	'FIELD-002': 'Valor incompativel',
	'FIELD-003': 'Valor inválido',
	'DATABASE-001': 'Registro já existênte',
	'DATABASE-002': 'Registro não encontrado',
	'USER-001': 'A senha atual esta incorreta',
	'USER-002': 'Já existe um usuário com este e-mail',
	'USER-003': 'Já existe um usuário com este nome de usuário',
	'PRODUCT-001': 'Código usado por outro produto',
}
