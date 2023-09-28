import { LoadingStyle } from 'components'
import { AcrylicPane } from './AcrylicPane'
import { Icon } from './Icon'

export const Loading = () => {
	return (
		<>
			<AcrylicPane />

			<div className={LoadingStyle.loadingIndicator}>
				<Icon icon={'sync'} />
			</div>
		</>
	)
}
