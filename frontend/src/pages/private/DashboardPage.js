import {
	BarChart,
	ButtonChooser,
	DateRange,
	Flex,
	FormGroup,
	FormGroupStyle,
	Label,
	LabelStyle,
	ProgressIndicator,
	RadialChart,
	SlideShow,
	Table,
} from 'components'
import { COLORS_SCHEMA } from 'constants/GeneralConstants'
import { UserContext } from 'hook'
import { useContext, useState } from 'react'
import Sample1 from '../../assets/sample1.jpg'
import Sample2 from '../../assets/sample2.jpg'
import Sample3 from '../../assets/sample3.jpg'
import Sample4 from '../../assets/sample4.jpg'
import './DashboardPage.scss'

export const DashboardPage = () => {
	const { privateColorSchema, setPrivateColorSchema } = useContext(UserContext)

	const [formValue, setFormValue] = useState({})
	const [dateRange, setDateRange] = useState({})

	return (
		<div className="dashboardPage">
			<h3>Dashboard</h3>
			<p>Esta é uma página de exemplo para o template</p>
			<ButtonChooser
				label="Esquema de Cores"
				list={COLORS_SCHEMA}
				value={privateColorSchema}
				onChange={setPrivateColorSchema}
			/>
			<ProgressIndicator label="Exemplo" value={0.5} />
			<Flex direction="row" gap="7px">
				<RadialChart value={40} size="200px" />
			</Flex>
			<Flex direction="row" gap="7px">
				<DateRange value={dateRange} onChange={setDateRange} />
			</Flex>
			<Flex direction="row" gap="7px">
				<Label>Michel</Label>
				<Label className={LabelStyle.nonSelected}>Michel</Label>
			</Flex>
			<Flex direction="row" gap="14px">
				<BarChart />
				<BarChart direction="vertical" />
			</Flex>
			<h3>Modelos de Slide</h3>
			<div className="slideRow">
				<SlideShow
					backToTheBeginning={false}
					pictures={[Sample2]}
					texts={[
						<>
							<h3>Design simples</h3>
						</>,
					]}
				/>
				<SlideShow
					backToTheBeginning={true}
					pictures={[Sample3, Sample4]}
					texts={[
						<>
							<h3>Design com sidebar</h3>
							<p>Torna o layout mais completo para sites que possuem muitas opções</p>
						</>,
						<>
							<h3>Mas devem ser desenvolvidos com cuidado</h3>
							<p>
								A responsividade com sidebar deve ser levada em consideração. Esta tela por exemplo
								já ficaria mais difícil em um celular.
							</p>
						</>,
					]}
				/>
				<SlideShow
					backToTheBeginning={false}
					pictures={[Sample1]}
					texts={[
						<>
							<h3>Design completo e com estilo</h3>
						</>,
					]}
				/>
				<SlideShow backToTheBeginning={true} pictures={[Sample1, Sample2, Sample3, Sample4]} />
			</div>
			<h3>Tabela</h3>
			<Table
				header={{
					name: 'Nome Completo',
					email: 'E-mail',
				}}
				responsiveHeader={{
					name: 'Nome Completo',
				}}
				data={[
					{
						name: 'Michel Douglas Grigoli',
						email: 'mdgrigoli@hotmail.com.br',
					},
					{
						name: 'Jéssica Gomes da Silva',
						email: 'jehhgoomes@hotmail.com',
					},
					{
						name: 'Michel Douglas Grigoli',
						email: 'mdgrigoli@hotmail.com.br',
					},
					{
						name: 'Jéssica Gomes da Silva',
						email: 'jehhgoomes@hotmail.com',
					},
					{
						name: 'Michel Douglas Grigoli',
						email: 'mdgrigoli@hotmail.com.br',
					},
					{
						name: 'Jéssica Gomes da Silva',
						email: 'jehhgoomes@hotmail.com',
					},
					{
						name: 'Michel Douglas Grigoli',
						email: 'mdgrigoli@hotmail.com.br',
					},
					{
						name: 'Jéssica Gomes da Silva',
						email: 'jehhgoomes@hotmail.com',
					},
					{
						name: 'Michel Douglas Grigoli',
						email: 'mdgrigoli@hotmail.com.br',
					},
					{
						name: 'Jéssica Gomes da Silva',
						email: 'jehhgoomes@hotmail.com',
					},
				]}
				usePagination={true}
				sizeRange={[2, 5, 10]}
				defaultPageSize={2}
			/>
			<h3>Formulário</h3>
			<FormGroup
				className="formSample"
				fieldDefinition={{
					fullName: {
						label: 'Nome Completo',
						placeholder: 'Ex: João da Silva',
					},
					birthday: {
						label: 'Aniversário',
						type: 'date',
					},
					email: {
						label: 'E-mail',
					},
					password: {
						label: 'Senha de Acesso',
						type: 'password',
						passwordStrength: true,
						help: 'Exemplo de ajuda',
					},
					confirm: {
						label: 'Confirmar',
						type: 'checkbox',
					},
				}}
				value={formValue}
				onChange={setFormValue}
				layoutDefinition={(fields) => (
					<>
						{fields.fullName}
						{fields.password}
						<div className={FormGroupStyle.formRow}>
							{fields.email}
							{fields.birthday}
						</div>
						{fields.confirm}
						<Flex direction="row" align="flex-end" gap="7px">
							<button data-icon="save">Salvar</button>
							<button data-icon="save" data-loading={true}>
								Salvar
							</button>
							<button className="transparent" data-icon="save">
								Salvar
							</button>
							<button className="transparent" data-icon="save" data-loading={true}>
								Salvar
							</button>
							<button disabled>Salvar</button>
							<button className="transparent" disabled>
								Salvar
							</button>
						</Flex>
					</>
				)}
			/>
		</div>
	)
}
