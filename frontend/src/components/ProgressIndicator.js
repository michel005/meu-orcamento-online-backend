import { ProgressIndicatorStyle } from 'components'

export const ProgressIndicator = ({ label, value, maximum = 1, showValueOnLabel = false }) => {
	return (
		<div className={ProgressIndicatorStyle.progressIndicator}>
			{!!label && (
				<label>
					{label}
					{showValueOnLabel && ` (${value})`}
				</label>
			)}
			<div
				className={ProgressIndicatorStyle.content}
				style={{ '--value': `${(value * 100) / maximum}%` }}
			/>
		</div>
	)
}
