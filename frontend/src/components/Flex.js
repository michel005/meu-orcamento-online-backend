export const Flex = ({ direction = 'column', gap = 0, align, ...props }) => {
	return (
		<div
			style={{
				display: 'flex',
				gap,
				flexDirection: direction,
				flexWrap: 'wrap',
				justifyContent: align,
			}}
			{...props}
		/>
	)
}
