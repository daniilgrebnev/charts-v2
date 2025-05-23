export const CustomRadarAngleAxis = ({
	cx,
	cy,
	payload,
	radius,
	activeIndex,
	index,
	onChangeElement,
}: any) => {
	// TODO: Радиус должен быть точно таким же, как `outerRadius` в RadarChart

	const angle = payload.coordinate
	const radians = (Math.PI / 180) * angle

	// Вычисляем позицию по кругу
	const radiusWithOffset = radius - 4 // методом подбора
	const x = cx + radiusWithOffset * Math.cos(-radians)
	const y = cy + radiusWithOffset * Math.sin(-radians)

	return (
		<g
			onClick={() => onChangeElement(index)}
			style={{
				cursor: 'pointer',
			}}
			transform={`translate(${x}, ${y})`}
		>
			{index == activeIndex ? (
				<circle r={12} fill='#F37D73' strokeWidth={2} stroke='white' />
			) : (
				<circle r={12} fill='white' stroke='#ADADAD' />
			)}
		</g>
	)
}
