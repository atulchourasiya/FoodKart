const TestimonialCard = (props) => {
	return (
		<div>
			<div className='card d-flex justify-content-center p-2 border-0 ' style={{ width: '23rem' }}>
				<div className='card-body'>
					<svg width='2rem' height='2rem' viewBox='0 0 351.128 351.128'>
						<g>
							<path
								d='M72.326,147.33c4.284-26.928,37.944-55.692,64.26-56.304c1.836,0,3.672-0.612,4.896-1.836
						c1.224-0.612,2.448-1.224,3.06-3.06c9.18-17.136,4.284-30.6-11.016-41.616c-17.748-12.852-45.9,0-59.976,11.628 C38.054,85.518,1.946,136.313,3.782,184.662c-6.12,32.437-4.896,67.32,4.284,96.084c6.12,18.36,23.868,27.54,42.228,28.764 c18.36,1.225,56.304,6.732,72.828-4.283c16.524-11.017,17.748-32.437,19.584-50.796c1.836-20.196,7.344-58.141-9.792-74.053 C115.778,165.078,66.818,181.602,72.326,147.33z'
							/>
							<path
								d='M274.286,147.33c4.284-26.928,37.943-55.692,64.26-56.304c1.836,0,3.672-0.612,4.896-1.836
						c1.225-0.612,2.448-1.224,3.061-3.06c9.18-17.136,4.284-30.6-11.016-41.616c-17.748-12.852-45.9,0-59.977,11.628
						c-35.496,29.376-71.604,80.172-69.768,128.52c-6.12,32.437-4.896,67.32,4.283,96.084c6.12,18.36,23.868,27.54,42.229,28.764
						c18.36,1.225,56.304,6.732,72.828-4.283c16.523-11.017,17.748-32.437,19.584-50.796c1.836-20.196,7.344-58.141-9.792-74.053
						C317.738,165.078,268.166,181.602,274.286,147.33z'
							/>
						</g>
					</svg>
					<p className='card-text font-script fs-3 mb-4'>{props.testimonial}</p>
					<hr className='m-auto mb-2' style={{width:'80%'}}/>
					<img
						className='rounded-circle m-auto d-flex align-items-center justify-content-center'
						src={`images/${props.img}`}
						width='35'
						height='35'
						alt=''></img>
					<p className='d-flex justify-content-center font-script fw-bold fs-4 mt-2' style={{lineHeight:1}}>-{props.name}</p>
					<p className='d-flex justify-content-center  font-lato fst-italic'>{props.desination}</p>
				</div>
			</div>
		</div>
	);
};

export default TestimonialCard;
