import { SlideShowStyle } from 'components'
import { useState } from 'react'

export const SlideShow = ({ pictures = [], texts = [], backToTheBeginning = false, ...props }) => {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [hideAll, setHideAll] = useState(false)

	return (
		<div>
			<div className={`${SlideShowStyle.slideShow} slideShow`} {...props}>
				{texts?.[currentSlide] && (
					<div className={`${SlideShowStyle.content} ${hideAll ? SlideShowStyle.hide : ''}`}>
						{texts[currentSlide]}
					</div>
				)}
				<div className={SlideShowStyle.allSlides} onDoubleClick={() => setHideAll((x) => !x)}>
					{pictures.map((picture, index) => {
						return (
							<img
								key={index}
								style={{ translate: `-${currentSlide * 100}% 0` }}
								src={picture}
								alt="Slide Show"
							/>
						)
					})}
				</div>
				{pictures.length > 1 && (
					<div className={`${SlideShowStyle.commands} ${hideAll ? SlideShowStyle.hide : ''}`}>
						<button
							className="transparent"
							data-icon="chevron_left"
							disabled={currentSlide === 0 && !backToTheBeginning}
							onClick={() => {
								setCurrentSlide((x) => (x === 0 ? pictures.length - 1 : x - 1))
							}}
						/>
						<div className={SlideShowStyle.stepController}>
							{pictures.length > 1 &&
								pictures.map((_, index) => {
									return (
										<button
											key={index}
											className="link"
											data-active={index === currentSlide}
											onClick={() => {
												setCurrentSlide(index)
											}}
										/>
									)
								})}
						</div>
						<button
							className="transparent"
							data-icon="chevron_right"
							disabled={currentSlide === pictures.length - 1 && !backToTheBeginning}
							onClick={() => {
								setCurrentSlide((x) => (x === pictures.length - 1 ? 0 : x + 1))
							}}
						/>
					</div>
				)}
			</div>
		</div>
	)
}
