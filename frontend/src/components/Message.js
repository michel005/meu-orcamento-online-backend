import { useContext } from 'react'
import { MessageContext } from '../hook/Message.context'
import {
	CenteredPanel,
	CenteredPanelContent,
	CenteredPanelFooter,
	CenteredPanelHeader,
} from './CenteredPanel'
import { CenteredPanelStyle } from 'components'

export const Message = () => {
	const { message, close } = useContext(MessageContext)

	return (
		<CenteredPanel
			className={CenteredPanelStyle.message}
			tabIndexMaster={100}
			zIndex={90}
			onClose={() => close()}
		>
			<CenteredPanelHeader icon={message.icon} onClose={close} header={message.header} />
			<CenteredPanelContent>{message.text}</CenteredPanelContent>
			<CenteredPanelFooter>
				{message.commands &&
					message.commands.map((command, index) => {
						return (
							<button
								key={index}
								onClick={() => {
									if (command.event) {
										command.event()
									}
									close()
								}}
								className={index > 0 ? 'transparent' : ''}
							>
								{command.text}
							</button>
						)
					})}
			</CenteredPanelFooter>
		</CenteredPanel>
	)
}
