import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { useSelector } from 'react-redux';
import TestimonialCard from '../Card/TestimonialCard';
import Heading from '../Heading/Heading';

const Testimonial = () => {
	const { TestimonialArray } = useSelector((state) => state.testimonialState);
	return (
		<section id='Testimonial'>
			<Heading heading='Why Our Client Choose Us' subheading='Testimonial' position='center' />
			<Splide
				aria-label='My Favorite Images'
				extensions={{ AutoScroll }}
				options={{
					type: 'loop',
					drag: 'free',
					focus: 'center',
					autoWidth: true,
					rewindByDrag: 'true',
					arrows: false,
					pagination: false,
					autoScroll: {
						speed: 0.5,
						pauseOnFocus: false,
						pauseOnHover: false
					}
				}}>
				{TestimonialArray?.map((item, index) => {
					return (
						<SplideSlide key={`SplideSlide${index}`}>
							<TestimonialCard
								name={item.name}
								img={item.img}
								testimonial={item.testimonial}
								desination={item.desination}
							/>
						</SplideSlide>
					);
				})}
			</Splide>
		</section>
	);
};

export default Testimonial;
