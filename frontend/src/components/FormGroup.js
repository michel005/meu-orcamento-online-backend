import { useCallback, useEffect } from 'react'
import { DateUtils } from 'utils'
import { Field } from './Field'
import { HelpIcon } from './HelpIcon'
import { FieldStyle, FormGroupStyle } from 'components'

export const FormGroup = ({
	fieldDefinition,
	layoutDefinition,
	value,
	onChange,
	validation = () => null,
	disableAll = false,
	className,
}) => {
	const validationFunction = useCallback(
		(field) => {
			if (fieldDefinition[field].validate) {
				return fieldDefinition[field].validate(value[field], value)
			} else if (fieldDefinition[field].passwordStrength) {
				let valid = checkPasswordStrength(value[field])
				if (Object.keys(valid).filter((x) => !valid[x].approved).length > 0) {
					return 'A senha informada não atende todos os requisitos'
				}
			}
		},
		[fieldDefinition, value]
	)

	const checkPasswordStrength = (password) => {
		let rules = {
			notInformed: {
				approved: false,
				name: 'Não é vazia',
			},
			lessThen8: {
				approved: false,
				name: 'Tem mais de 8 caracteres',
			},
			upperLetter: {
				approved: false,
				name: 'Tem letras maiúsculas (ABC...)',
			},
			number: {
				approved: false,
				name: 'Tem números (1234567890)',
			},
			especial: {
				approved: false,
				name: `Tem caracteres especiais (!@#$%^&*()-_=+][}{\\|'"/;:.>,<)`,
			},
		}
		if ((password || '').length > 0) {
			rules.notInformed.approved = true
		}
		if ((password || '').length >= 8) {
			rules.lessThen8.approved = true
		}
		if (
			(password || '')
				.split('')
				.filter((letter) => 'ABCDEFGHIJKLMNOPQRSTUVWYXZ'.indexOf(letter) > -1).length > 0
		) {
			rules.upperLetter.approved = true
		}
		if (
			(password || '').split('').filter((letter) => '1234567890'.indexOf(letter) > -1).length > 0
		) {
			rules.number.approved = true
		}
		if (
			(password || '')
				.split('')
				.filter((letter) => '!@#$%^&*()-_=+][}{\\|\'"/;:.>,<`~'.indexOf(letter) > -1).length > 0
		) {
			rules.especial.approved = true
		}
		return rules
	}

	const wrappedOnChange = useCallback(
		(value) => {
			onChange(value)
		},
		[onChange]
	)

	const wrappedErrorValidation = useCallback(() => {
		let validations = {
			status: 'OK',
			validations: {},
		}
		Object.keys(fieldDefinition)
			.filter((field) => !fieldDefinition[field].hide)
			.forEach((field) => {
				let fieldValidation = fieldDefinition[field].validate
				if (fieldValidation) {
					let validationResult = validationFunction(field)
					if (!!validationResult) {
						validations.validations[field] = validationResult
					}
				}
			})
		if (Object.keys(validations.validations).filter((x) => validations.validations[x]).length > 0) {
			validations.status = 'E'
		}
		validation(validations)
	}, [fieldDefinition, validation, validationFunction])

	useEffect(() => {
		wrappedOnChange(value)
		wrappedErrorValidation()
	}, [value, wrappedOnChange, wrappedErrorValidation])

	const FormField = ({ field }) => {
		let fieldDef = fieldDefinition[field]
		let fieldType = fieldDef.type || 'text'
		let passwordStrength = fieldDef.passwordStrength
		let fieldValidation = () => validationFunction(field)
		let nullable = fieldDef.nullable
		let inputClassName = fieldDef.inputClassName
		let fakeField = fieldDef?.fakeField
		let valueModifier = fieldDef.valueModifier
		let help = fieldDef.help
		let helpPosition = fieldDef.helpPosition
		let label = fieldDef.label
		let whenChange = fieldDef.whenChange
		let placeholder = fieldDef.placeholder
		let onAction = fieldDef.onAction

		if (fakeField) {
			return (
				<div className={FieldStyle.field}>
					<label>
						{label} {help && <HelpIcon helpText={help} position={helpPosition} />}
					</label>
					<div className={FieldStyle.fieldValue}>
						{valueModifier ? valueModifier(value) : value[field] || ''}
					</div>
				</div>
			)
		}

		if (fieldType === 'checkbox') {
			return (
				<div className={'field'} style={{ flexDirection: 'row' }}>
					<input
						disabled={disableAll}
						type="checkbox"
						checked={valueModifier ? valueModifier(value) : value[field] || false}
						onChange={(e) => {
							onChange((vv) => {
								vv[field] = e.target.checked
								return { ...vv }
							})
						}}
					/>
					<label>
						{label} {!!help && <HelpIcon helpText={help} position={helpPosition} />}
					</label>
				</div>
			)
		}

		if (fieldType === 'select') {
			let fieldList = fieldDef.list
			let selectId = fieldDef.selectId
			let selectValue = fieldDef.selectValue

			if (!!fieldList && !!selectId && !!selectValue) {
				return (
					<div className={'field'}>
						<label>
							{label} {!!help && <HelpIcon helpText={help} position={helpPosition} />}
						</label>
						<select
							disabled={disableAll}
							className={inputClassName || ''}
							onChange={(e) => {
								onChange((vv) => {
									if (e.target.value === '') {
										vv[field] = null
									} else {
										vv[field] =
											fieldList?.[
												Object.keys(fieldList).find(
													(row) => e.target.value === selectId(fieldList[row])
												)
											]
									}
									return { ...vv }
								})
							}}
							value={value?.[field] ? selectId(value?.[field]) : ''}
						>
							{nullable ? <option></option> : <></>}
							{Object.keys(fieldList).map((row, idx) => {
								return (
									<option key={idx} value={selectId(fieldList[row])}>
										{selectValue(fieldList[row])}
									</option>
								)
							})}
						</select>
					</div>
				)
			} else {
				return (
					<div className={'field'}>
						<label>
							{label} {help && <HelpIcon helpText={help} position={helpPosition} />}
						</label>
						<select
							disabled={disableAll}
							className={inputClassName || ''}
							onChange={(e) => {
								onChange((vv) => {
									if (e.target.value === '') {
										vv[field] = null
									} else {
										vv[field] = e.target.value
									}
									return { ...vv }
								})
							}}
							value={value?.[field] || ''}
						>
							{nullable ? <option></option> : <></>}
							{Object.keys(fieldList).map((field, idx) => {
								return (
									<option key={field} value={field}>
										{fieldList[field]}
									</option>
								)
							})}
						</select>
					</div>
				)
			}
		}

		const pass = passwordStrength ? checkPasswordStrength(value?.[field] || '') : {}
		let min, max
		if (fieldType === 'date') {
			if (fieldDef.min) {
				min = DateUtils.stringToInputDate(fieldDef.min)
			}
			if (fieldDef.max) {
				max = DateUtils.stringToInputDate(fieldDef.max)
			}
		}

		return (
			<>
				<Field
					label={fieldDef.label}
					type={fieldType}
					disabled={disableAll || fieldDef.disabled || false}
					inputClassName={inputClassName || ''}
					help={help}
					helpPosition={helpPosition}
					value={
						fieldType === 'date'
							? DateUtils.stringJustDateDefaultFormat(DateUtils.stringToDate(value[field] || null))
							: value[field] || ''
					}
					onBlur={whenChange}
					placeholder={placeholder}
					onAction={onAction}
					onChange={(value) => {
						onChange((x) => {
							if (fieldType === 'date') {
								if (!value) {
									x[field] = null
								} else {
									let splitDate = value.split('-')
									x[field] = DateUtils.stringJustDate(
										new Date(
											parseInt(splitDate[0]),
											parseInt(splitDate[1]) - 1,
											parseInt(splitDate[2])
										)
									)
								}
							} else if (fieldType === 'number') {
								try {
									x[field] = parseFloat(value)
								} catch (_) {
									try {
										x[field] = parseInt(value)
									} catch (_) {
										x[field] = null
									}
								}
							} else {
								x[field] = value
							}
							return { ...x }
						})
					}}
					error={fieldValidation(value[field])}
					min={min}
					max={max}
				/>
				{passwordStrength && (
					<ul className={FormGroupStyle.passwordStrength}>
						{Object.keys(pass).map((rule) => {
							return (
								<li
									key={rule}
									className={
										pass[rule].approved ? FormGroupStyle.approved : FormGroupStyle.notApproved
									}
								>
									{pass[rule].name}
								</li>
							)
						})}
					</ul>
				)}
			</>
		)
	}

	if (layoutDefinition) {
		let finalFieldCollection = {}
		Object.keys(fieldDefinition)
			.filter(
				(field) =>
					fieldDefinition[field].hideWhenNull === undefined ||
					(fieldDefinition[field].hideWhenNull && !!value[field])
			)
			.filter((field) => !fieldDefinition[field].hide || !fieldDefinition[field].hide)
			.forEach((field) => {
				finalFieldCollection[field] = FormField({ field: field })
			})
		return (
			<div className={`${FormGroupStyle.formLayout} ${className}`}>
				{layoutDefinition(finalFieldCollection)}
			</div>
		)
	} else {
		return (
			<div className={`${FormGroupStyle.formLayout} ${className}`}>
				{Object.keys(fieldDefinition)
					.filter((field) => !fieldDefinition[field].hideWhenNull || !!value[field])
					.filter((field) => !fieldDefinition[field].hide)
					.map((field, fieldIndex) => {
						return <div key={fieldIndex}>{FormField({ field: field })}</div>
					})}
			</div>
		)
	}
}
