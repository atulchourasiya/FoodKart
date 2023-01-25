import burger from '../../Assets/SilderImage/burger.jpg';
import sweet from '../../Assets/SilderImage/sweet.jpg';
import desert from '../../Assets/SilderImage/desert.jpg';
import sushi from '../../Assets/SilderImage/sushi.jpg';
import main from '../../Assets/SilderImage/main.jpg';
import './Carousel.css';
import Search from '../Search/Search';
import TypingEffect from '../TypingEffect/TypingEffect';

function CarouselSilder() {
	return (
		<section
			id='carouselExampleDark'
			className='carousel slide carousel-light carousel-fade'
			data-bs-ride='carousel'
			data-bs-pause='false'
			data-bs-keyboard='true'
			data-bs-interval='4000'>
			<div className='carousel-inner'>
				<div className='carousel-item active'>
					<img src={burger} className='d-block ' alt='...' />
				</div>
				<div className='carousel-item'>
					<img src={sweet} className='d-block' alt='...' />
				</div>
				<div className='carousel-item'>
					<img src={desert} className='d-block' alt='...' />
				</div>
				<div className='carousel-item'>
					<img src={sushi} className='d-block' alt='...' />
				</div>
				<div className='carousel-item'>
					<img src={main} className='d-block' alt='...' />
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
