import { useContext, useState } from 'react'
import { ConfigContext } from '../hook/Config.context'
import { MessageContext } from '../hook/Message.context'
import { Icon } from './Icon'
import { Loading } from './Loading'
import { CenteredPanelStyle } from 'components'

const CenteredPanel = ({
	className,
	zIndex = 100,
	onClose,
	formEntity,
	tabIndexMaster = 1,
	...props
}) => {
	const { defineShowForm } = useContext(ConfigContext)
	const { close } = useContext(MessageContext)

	return (
		<div
			tabIndex={tabIndexMaster}
			className={CenteredPanelStyle.centeredPanel}
			style={{ zIndex: zIndex }}
			onKeyDown={(e) => {
				if (e.key === 'Escape') {
					if (formEntity) {
						defineShowForm(formEntity, false)
						close()
					} else {
						if (onClose) {
							onClose()
						}
					}
				}
			}}
		>
			<div className={`${CenteredPanelStyle.panel} ${className}`} {...props}></div>
		</div>
	)
}

const CenteredPanelContent = ({ children, loading, ...props }) => {
	return (
		<div className={CenteredPanelStyle.content} {...props}>
			{children}
			{loading && <Loading />}
		</div>
	)
}

const CenteredPanelFooter = ({ ...props }) => {
	return <div className={CenteredPanelStyle.footer} {...props}></div>
}

const CenteredPanelHeader = ({ icon, header, onClose }) => {
	return (
		<div className={CenteredPanelStyle.header}>
			{icon && <Icon className={CenteredPanelStyle.headerIcon} icon={icon} />}
			<h3>{header}</h3>
			{onClose && (
				<Icon className={CenteredPanelStyle.closeButton} icon={'close'} onClick={onClose} />
			)}
		</div>
	)
}

const CenteredPanelToolbar = ({ ...props }) => {
	return <div className={CenteredPanelStyle.toolbar} {...props}></div>
}

const CenteredPanelTabs = ({ tabs = [], ...props }) => {
	const [selectedTab, setSelectedTab] = useState(tabs?.[0] || null)

	return {
		tabs: (
			<div className={CenteredPanelStyle.tabs} {...props}>
				{tabs.map((tab, tabIndex) => {
					return (
						<button
							onClick={() => setSelectedTab(tab)}
							className={selectedTab === tab ? CenteredPanelStyle.selected : ''}
							key={tabIndex}
						>
							{tab}
						</button>
					)
				})}
			</div>
		),
		selectedTab,
	}
}

export {
	CenteredPanel,
	CenteredPanelContent,
	CenteredPanelFooter,
	CenteredPanelHeader,
	CenteredPanelTabs,
	CenteredPanelToolbar,
}
