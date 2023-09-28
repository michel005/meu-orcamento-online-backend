import { EMPTY_FUNCTION } from 'constants/GeneralConstants'
import { PROJECT_INFO } from 'config/ProjectInfo'
import { createContext, useEffect, useState } from 'react'
import { SortUtils } from 'utils'

export const NotificationContext = createContext({
	allowed: null,
	notification: [],
	setNotification: EMPTY_FUNCTION,
	pushNotification: EMPTY_FUNCTION,
	clearNotifications: EMPTY_FUNCTION,
	removeNotification: EMPTY_FUNCTION,
	pushPersistentNotification: EMPTY_FUNCTION,
})

export const NotificationProvider = ({ children }) => {
	const [notification, setNotification] = useState([])
	const [allowed, setAllowed] = useState(false)

	useEffect(() => {
		if (Notification.permission !== 'denied') {
			Notification.requestPermission().then((permission) => {
				setAllowed(permission === 'granted')
			})
		}
	}, [])

	const createNotification = ({ icon, message, event }) => {
		let lastID = notification.sort((x, y) => SortUtils.numberSort(x.id, y.id, true))?.[0]?.id || 0
		let instance = null
		if (allowed) {
			instance = new Notification(PROJECT_INFO.name, { body: message })
		}
		return {
			id: lastID + 1,
			dateTime: new Date(),
			icon,
			message,
			event: () => {
				if (event) {
					event()
				}
				if (instance) {
					instance.close()
				}
			},
			instance,
		}
	}

	const pushNotification = ({ icon, message, event }) => {
		let newNotification = createNotification({ icon, message, event })
		setNotification((x) => {
			x.push(newNotification)
			return [...x]
		})
		setTimeout(() => {
			newNotification.displayed = true
			setNotification((x) => {
				return [...x]
			})
		}, 5000)
	}

	const pushPersistentNotification = ({ icon, message, event }) => {
		let newNotification = createNotification({ icon, message, event })
		setNotification((x) => {
			x.push(newNotification)
			return [...x]
		})
	}

	const closeNotification = (notificationId) => {
		setNotification((x) => {
			x.find((x) => x.id === notificationId).displayed = true
			return [...x]
		})
	}

	const removeNotification = (notificationId) => {
		if (notification.filter((x) => x.id === notificationId)?.instance) {
			notification.filter((x) => x.id === notificationId)?.instance.close()
		}
		setNotification((x) => {
			return [...x.filter((x) => x.id !== notificationId)]
		})
	}

	const clearNotifications = () => {
		notification.forEach((x) => {
			if (x?.instance) {
				x?.instance.close()
			}
		})
		setNotification([])
	}

	return (
		<NotificationContext.Provider
			value={{
				allowed,
				notification,
				setNotification,
				pushNotification,
				clearNotifications,
				removeNotification,
				closeNotification,
				pushPersistentNotification,
			}}
		>
			{children}
		</NotificationContext.Provider>
	)
}
