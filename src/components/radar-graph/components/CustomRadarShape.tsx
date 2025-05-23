export const CustomRadarShape = (props: any) => {
	const { points, angleAxis, activeIndex, onChangeElement, radius } = props
	const { cx, cy } = angleAxis

	const activeElement = points[activeIndex]
	const otherElements = points.filter((_: any, i: any) => i !== activeIndex)

	// Найдем максимальный радиус графика (расстояние до самой дальней точки)

	const renderPoint = (p: any, index: number, isActive: boolean) => {
		const dx = p.x - cx
		const dy = p.y - cy
		const angleRad = Math.atan2(dy, dx)
		const angleDeg = (angleRad * 180) / Math.PI - 270

		// Расстояние от центра до точки
		const length = Math.sqrt(dx * dx + dy * dy)

		const tipY = -length // Вершина наверху, основание — внизу

		// Координаты точки на максимальном значении (100%)
		const maxX = cx + (dx / length) * radius
		const maxY = cy + (dy / length) * radius

		const min = -25
		const max = 100
		const scale = radius / (max - min)
		const radiusAtZero = (0 - min) * scale

		const BASE_RADIUS = 283.2 // 1) 0.4, 2) 1.1
		// также при 283.3 значения расширения 60 и 30
		// 283.3 это значение которое подобрано с помощью console.log(radius) на основном экране разработки
		//при радиусе 146 значения расширения 40 и 20
		// 146 Это вертикальная ориентация IPad IPadOS 14.7.1 (dev tools)
		// Относительный коэффициент масштаба
		const scaleFactor = radius / BASE_RADIUS

		let expansion_value = 35 * scaleFactor

		let anycount = 0.3

		let aspect_coefficient = 3

		// Масштабированные коэффициенты
		const coefficient1 = anycount
		const coefficient2 = anycount * aspect_coefficient

		return (
			<g
				key={index}
				style={{ cursor: 'pointer' }}
				onClick={() => onChangeElement(index)}
			>
				{/* Лепесток */}
				<g transform={`translate(${cx},${cy}) rotate(${angleDeg})`}>
					<path
						d={`
		M -${radiusAtZero * 1.2} 0
		C -${expansion_value * 2} ${tipY * coefficient1}, -${expansion_value} ${
							tipY * coefficient2
						}, 0 ${tipY}
		C ${expansion_value} ${tipY * coefficient2}, ${expansion_value * 2} ${
							tipY * coefficient1
						}, ${radiusAtZero * 1.2} 0
		Z
	`}
						fill={isActive ? '#F8AAA4' : 'rgba(115, 195, 243, 0.1)'}
					/>
				</g>

				{/* Центральный круг и текст */}
				{isActive && (
					<g>
						<line
							x1={p.x}
							y1={p.y}
							x2={maxX}
							y2={maxY}
							stroke='#F37D73'
							strokeWidth={2}
						/>

						<circle
							cx={cx}
							cy={cy}
							r={radiusAtZero}
							fill='white'
							stroke='#F8AAA4'
							strokeWidth={radiusAtZero / 2.5}
						/>
						<circle
							cx={cx}
							cy={cy}
							r={60}
							fill='none'
							filter='drop-shadow(20px #000)'
						/>
						<text
							x={cx}
							y={cy + 8}
							textAnchor='middle'
							fontSize='clamp(16px, 2vw, 24px)'
							fontWeight={600}
							fill='#2A3A4B'
						>
							{`${p.payload?.value}%`}
						</text>
					</g>
				)}

				{/* Конечная точка */}
				<circle
					cx={p.x}
					cy={p.y}
					r={8}
					fill={isActive ? '#fff' : '#73C3F3'}
					stroke={isActive ? '#F37D73' : 'white'}
					strokeWidth={isActive ? 4 : 2}
				/>
			</g>
		)
	}

	return (
		<>
			<circle cx={cx} cy={cy} r={6} fill='red' stroke='white' strokeWidth={2} />

			{/* Сначала отрисуем все НЕактивные */}
			{otherElements.map((p: any, index: number) =>
				renderPoint(p, index < activeIndex ? index : index + 1, false)
			)}

			{/* Активный отрисуем ПОСЛЕДНИМ, чтобы он был сверху */}
			{activeElement && renderPoint(activeElement, activeIndex, true)}
		</>
	)
}
