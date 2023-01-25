import React from 'react';
import { NavHashLink } from 'react-router-hash-link';
const ServiceCard = (props) => {
	return (
		<div>
			<div
				className='card mb-4'
				style={{
					width: '17rem',
					border: 'none',
					boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
				}}>
				<img src={props.img} style={{ height: '10rem' }} className='card-img-top' alt='...' />
				<div className='card-body mb-2'>
					<h5 className='card-title'>{props.heading}</h5>
					<p className='card-text mb-3 font-lato'>
						{props.text ??
							'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum similique possimus assumenda '}
					</p>
					<NavHashLink
						to={props.link}
						className={'button font-lato'}>
						{props.btnText}
					</NavHashLink>
				</div>
			</div>
		</div>
	);
};

export default ServiceCard;
