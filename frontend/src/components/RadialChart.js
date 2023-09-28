import { RadialChartStyle } from 'components'
import { useEffect, useRef, useState } from 'react'

export const RadialChart = ({ value, content, size = '100px' }) => {
	const chartRef = useRef()

	const [calc, setCalc] = useState({
		width: size,
		height: size,
	})

	useEffect(() => {
		setCalc((x) => ({
			width: x?.width || `${chartRef.current.offsetWidth}px`,
			height: x?.height || `${chartRef.current.offsetHeight}px`,
		}))
	}, [])

	return (
		<div
			ref={chartRef}
			className={RadialChartStyle.radialChart}
			style={{
				'--chart-value': value,
				'--chart-height': calc?.height,
				'--chart-width': calc?.width,
			}}
		>
			<span>{content || <>{value}%</>}</span>
			<svg
				width={(calc?.width || '0').replace('px', '')}
				height={(calc?.height || '0').replace('px', '')}
			>
				<g>
					<circle
						className={RadialChartStyle.background}
						r={(69.85699 / 160) * parseInt((calc?.width || '0').replace('px', ''))}
					/>
					<circle
						className={RadialChartStyle.value}
						r={(69.85699 / 160) * parseInt((calc?.width || '0').replace('px', ''))}
					/>
				</g>
			</svg>
		</div>
	)
}
