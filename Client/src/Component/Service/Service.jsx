import ServiceCard from '../Card/ServiceCard';
import './Service.css'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Heading from '../Heading/Heading';
import { ServiceArray } from './ServiceFunc';
const Service = () => {
	return (
		<section id='serviceSectionContainer' className='p-4'>
			<Heading heading='What We Offer' subheading='Our Services' position='start' />
			<Splide
				aria-label='My Favorite Images'
				options={{
					type: 'loop',
					drag: 'free',
					focus: 'center',
					gap: '2rem',
					perMove: 1,
					autoWidth: true,
					rewindByDrag: 'true',
					pagination: false
				}}>
				{ServiceArray.map((item, index) => {
					return (
						<SplideSlide key={`SplideSlide${index}`}>
							<ServiceCard img={item.img} heading={item.heading} btnText={item.btnText} link={item.link}/>
						</SplideSlide>
					);
				})}
			</Splide>
		</section>
	);
};

export default Service;
