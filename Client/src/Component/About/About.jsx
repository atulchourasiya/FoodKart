import React from 'react';
import './About.css';
import pizza from '../../Assets/About/dessert.png';
import Heading from '../Heading/Heading';

const About = () => {
	function submitForm() {
		var fileInput = document.getElementById('fileInput');
		var files = fileInput.files;
		var formData = new FormData();
		if (files.length != 0) {
			for (const file of files) {
				formData.append('images', file);
			}
		}
		fetch('http://localhost:5000/multiple', {
			method: 'POST',
			body: formData
		})
			.then((response) => response.json())
			.then((data) => console.log(JSON.stringify(data)))
			.catch((error) => console.log(error));
	}
	return (
		<section id='aboutSectionContainer' className='font-pinyon p-4 about '>
			<form encType='multipart/form-data'>
				<div className='mb-3'>
					<input type='file' id='fileInput' name='images' className='form-control' multiple />
				</div>
				<button type='submit' onClick={submitForm} className='btn btn-primary'>
					Submit
				</button>
			</form>

			<div className='d-flex'>
				<div>
					<Heading subheading='About' heading='Who We Are' />
					<div className='imagecontainer'>
						<img className='image' src={pizza} alt='' />
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
