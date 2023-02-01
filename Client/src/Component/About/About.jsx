import React from 'react';
import './About.css';
import Heading from '../Heading/Heading';

const About = () => {
	return (
		<section id='aboutSectionContainer' className='font-pinyon p-4 about '>
			<div className='d-flex'>
				<div>
					<Heading subheading='About' heading='Who We Are' />
					<div className='imagecontainer'>
						<img className='image' src={'images/1675000010438-dessert.png'} alt='' />
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque vitae sint, praesentium
						odit nemo quibusdam ratione. Voluptatum fugit magnam eum dicta inventore hic, vero Lorem
						ipsum dolor sit, amet consectetur adipisicing elit. Eos maiores dolorum itaque
						asperiores doloremque officiis
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
