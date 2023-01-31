import React from 'react';
import Heading from '../Heading/Heading';
import './Gallery.css'
const Gallery = () => {
	return (
		<div id='gallerySectionContainer'>
			<Heading heading='The Moments We Cherish' subheading='Gallery' position='center' />
			<div className='gridContainer p-3'>
				<div className='griditemContainer'>
					<img alt='' className='griditem' src={`images/1675001177488-food-06.jpg`}></img>
				</div>
				<div className='griditemContainer'>
					<img alt='' className='griditem' src={`images/1675001177490-food-08.jpg`}></img>
				</div>
				<div className='griditemContainer'>
					<img alt='' className='griditem' src={`images/1675001177502-food-11.jpg`}></img>
				</div>
				<div className='griditemContainer'>
					<img alt='' className='griditem' src={`images/1675001177506-food-12.jpg`}></img>
				</div>
				<div className='griditemContainer'>
					<img alt='' className='griditem' src={`images/1675001177511-food-13.jpg`}></img>
				</div>
				<div className='griditemContainer'>
					<img alt='' className='griditem' src={`images/1675001177521-food-16.jpg`}></img>
				</div>
				<div className='griditemContainer'>
					<img alt='' className='griditem' src={`images/1675001177524-food-19.jpg`}></img>
				</div>
				<div className='griditemContainer'>
					<img alt='' className='griditem' src={`images/1675001177488-food-06.jpg`}></img>
				</div>
				<div className='griditemContainer'>
					<img alt='' className='griditem' src={`images/1675001177483-food-01.jpg`}></img>
				</div>
			</div>
		</div>
	);
};

export default Gallery;
