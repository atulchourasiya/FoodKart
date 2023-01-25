import React from 'react';
import Heading from '../Heading/Heading';
import food06 from '../../Assets/Gallery/food-06.jpg';
import food8 from '../../Assets/Gallery/food-08.jpg';
import food11 from '../../Assets/Gallery/food-11.jpg';
import food12 from '../../Assets/Gallery/food-12.jpg';
import food13 from '../../Assets/Gallery/food-13.jpg';
import food16 from '../../Assets/Gallery/food-16.jpg';
import food19 from '../../Assets/Gallery/food-19.jpg';
import food21 from '../../Assets/Gallery/food-21.jpg';
import food1 from '../../Assets/Gallery/food-01.jpg';
import './Gallery.css'
const Gallery = () => {
	return (
		<div id='gallerySectionContainer'>
			<Heading heading='The Moments We Cherish' subheading='Gallery' position='center' />
			<div className='gridContainer p-3'>
				<div className='griditemContainer'>
					<img alt='' className='griditem' src={food06}></img>
				</div>
				<div className='griditemContainer'>
					<img alt='' className='griditem' src={food8}></img>
				</div>
				<div className='griditemContainer'>
					<img alt='' className='griditem' src={food11}></img>
				</div>
				<div className='griditemContainer'>
					<img alt='' className='griditem' src={food12}></img>
				</div>
				<div className='griditemContainer'>
					<img alt='' className='griditem' src={food13}></img>
				</div>
				<div className='griditemContainer'>
					<img alt='' className='griditem' src={food16}></img>
				</div>
				<div className='griditemContainer'>
					<img alt='' className='griditem' src={food19}></img>
				</div>
				<div className='griditemContainer'>
					<img alt='' className='griditem' src={food21}></img>
				</div>
				<div className='griditemContainer'>
					<img alt='' className='griditem' src={food1}></img>
				</div>
			</div>
		</div>
	);
};

export default Gallery;
