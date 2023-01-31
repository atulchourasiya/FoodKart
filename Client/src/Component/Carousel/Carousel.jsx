import './Carousel.css';
import Search from '../Search/Search';
import TypingEffect from '../TypingEffect/TypingEffect';
import { useEffect } from 'react';

function CarouselSilder() {
	useEffect(() => {
		document.getElementById('next').click();
	}, []);
	return (
		<section
			id='carouselExampleDark'
			className='carousel slide carousel-light carousel-fade'
			data-bs-ride='carousel'
			data-bs-pause='false'
			data-bs-keyboard='true'
			data-bs-interval='3000'>
			<div className='carousel-inner'>
				<div className='carousel-item active'>
					<img src={`images/1675002591229-sweet.jpg`} className='d-block' alt='...' />
				</div>
				<div className='carousel-item '>
					<img src={`images/1675002591171-burger.jpg`} className='d-block ' alt='...' />
				</div>
				<div className='carousel-item'>
					<img src={`images/1675002591198-desert.jpg`} className='d-block' alt='...' />
				</div>
				<div className='carousel-item'>
					<img src={`images/1675002591219-sushi.jpg`} className='d-block' alt='...' />
				</div>
				<div className='carousel-item'>
					<img src={`images/1675002591207-main.jpg`} className='d-block' alt='...' />
				</div>
			</div>
			<div className='carousel-caption d-md-block headerContent'>
				<TypingEffect
					text={[
						'THE FOOD AT YOUR <mark>DOORSTEP</mark>',
						'THE JOY OF GETTING THE <mark>BEST</mark>',
						'GIVING YOUR HUNGER A NEW <mark>OPTION</mark>',
						'LET <mark>DELICIOUSNESS</mark> TWIRL IN YOUR MOUTH',
						'SATISFY YOUR HUNGER? <mark>CALL US</mark>'
					]}
				/>
				<Search text={'What do you wanna eat?'} />
			</div>
			<button
				className='carousel-control-prev'
				type='button'
				data-bs-target='#carouselExampleDark'
				data-bs-slide='prev'>
				<span className='carousel-control-prev-icon' aria-hidden='true'></span>
				<span className='visually-hidden'>Previous</span>
			</button>
			<button
				id='next'
				className='carousel-control-next'
				type='button'
				data-bs-target='#carouselExampleDark'
				data-bs-slide='next'>
				<span className='carousel-control-next-icon' aria-hidden='true'></span>
				<span className='visually-hidden'>Next</span>
			</button>
		</section>
	);
}
export default CarouselSilder;
