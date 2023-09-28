import { createContext, useState } from 'react'

const MessageContext = createContext({
	message: null,
	setMessage: () => null,
	close: () => null,
	simpleMessage: () => null,
	simpleQuestion: () => null,
	choiceMessage: () => null,
	errorMessage: () => null,
})

export const MessageProvider = ({ children }) => {
	const [message, setMessage] = useState(undefined)

	const yesButton = 'Sim'
	const noButton = 'Não'

	const simpleMessage = ({ header, text }) => {
		setMessage({
			header,
			text,
		})
	}

	const simpleQuestion = (header, text, yesEvent) => {
		choiceMessage({
			header,
			text,
			option1: {
				text: yesButton,
				event: yesEvent,
			},
		})
	}

	const choiceMessage = ({
		icon,
		header,
		text,
		option1 = { text: yesButton, event: () => null },
		option2 = { text: noButton, event: () => null },
	}) => {
		setMessage({
			icon,
			header,
			text,
			commands: [option1, option2],
		})
	}

	const errorMessage = ({ header, text }) => {
		setMessage({
			icon: 'warning',
			header,
			text: text.response?.data ? (
				<ul>
					{Array.isArray(text.response?.data)
						? text.response.data.map((error, index) => {
								return <li key={index}>{error}</li>
						  })
						: text.response?.data}
				</ul>
			) : (
				JSON.stringify(text).substring(0, 200)
			),
		})
	}

	const close = () => {
		setMessage(undefined)
	}

	return (
		<MessageContext.Provider
			value={{
				setMessage,
				message,
				close,
				simpleMessage,
				simpleQuestion,
				choiceMessage,
				errorMessage,
			}}
		>
			{children}
		</MessageContext.Provider>
	)
}

export { MessageContext }
