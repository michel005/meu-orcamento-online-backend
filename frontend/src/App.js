import { Message } from 'components'
import { UserContext } from 'hook'
import { MainLandingPage } from 'pages/public/MainLandingPage'
import { useContext } from 'react'
import { MessageContext } from './hook/Message.context'
import { MainComponent } from 'pages/private/MainComponent'

export const App = () => {
	const { user, privateColorSchema, publicColorSchema } = useContext(UserContext)
	const { message } = useContext(MessageContext)

	return (
		<div className={`colorSchema${user ? privateColorSchema : publicColorSchema}`}>
			<MainLandingPage />
			<MainComponent />
			{message && <Message />}
		</div>
	)
}
