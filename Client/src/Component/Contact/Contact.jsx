import React from 'react';
import Heading from '../Heading/Heading';
import './Contact.css';
import { useSelector, useDispatch } from 'react-redux';
import { handleContactFormSubmit, isUserNull } from './ContactFunc';
import { useRef, useState } from 'react';
import { showToast } from '../Login/loginFunc';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
	let { user } = useSelector((state) => state.authState);
	let { LastContactDate } = useSelector((state) => state.contactState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const name = useRef();
	const email = useRef();
	const message = useRef();
	const form = useRef();
	return (
		<div id='contactSectionContainer'>
			<div className='d-flex  justify-content-around flex-wrap'>
				<div className='d-flex align-items-center p-4 flex-column'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='var(--heading-color)'
						className='bi bi-geo-alt-fill'
						viewBox='0 0 16 16'>
						<path d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z' />
					</svg>
					<p className='font-lato pt-2 fw-bold'>Location</p>
					<p className='text-center'>
						C-39 Iind Floor,
						<br /> Opposite Hotel Sangat Plaza <br />
						Zone-1 M.P. Nagar, Bhopal - 462011
					</p>
				</div>
				<div className='d-flex align-items-center p-4 flex-column'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='var(--heading-color)'
						className='bi bi-telephone-fill'
						viewBox='0 0 16 16'>
						<path
							fillRule='evenodd'
							d='M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z'
						/>
					</svg>
					<p className='font-lato pt-2 fw-bold'>Phone</p>
					<p>+91 8959199718</p>
				</div>
				<div className='d-flex align-items-center p-4 flex-column'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='var(--heading-color)'
						className='bi bi-envelope'
						viewBox='0 0 16 16'>
						<path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z' />
					</svg>
					<p className='font-lato pt-2 fw-bold'>Email</p>
					<p>atulchourasiya73@gmail.com</p>
				</div>
				<div className='d-flex align-items-center p-4 flex-column'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='var(--heading-color)'
						className='bi bi-clock-history'
						viewBox='0 0 16 16'>
						<path d='M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z' />
						<path d='M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z' />
						<path d='M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z' />
					</svg>
					<p className='font-lato pt-2 fw-bold'>Working Hours</p>
					<p>Monday-Sunday</p>
					<p>10AM-10PM</p>
				</div>
			</div>

			<Heading heading='Send A Message' subheading='Contact' position='center' />
			<form
				ref={form}
				onSubmit={(event) => {
					event.preventDefault();
					handleContactFormSubmit(
						user,
						form,
						name,
						email,
						message,
						dispatch,
						setLoading,
						navigate,
						LastContactDate
					);
				}}>
				<div className='p-4'>
					<div className='row'>
						<div className='mb-3 col-6'>
							<input
								type='text'
								className='form-control p-3 blackBorder'
								placeholder='Your name'
								ref={name}
								name='from_name'
								value={
									user !== null
										? user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()
										: ''
								}
								onClick={() => {
									if (!isUserNull(user,navigate)) {
										showToast(
											'warning',
											"This field can't be edit. you just have to type message & send."
										);
									}
								}}
								readOnly
							/>
						</div>
						<div className='mb-3 col-6'>
							<input
								type='email'
								className='form-control p-3 blackBorder'
								placeholder='yourmail@gmail.com'
								name='from_email'
								ref={email}
								value={user !== null ? user.email : ''}
								onClick={() => {
									if (!isUserNull(user,navigate)) {
										showToast(
											'warning',
											"This field can't be edit. you just have to type message & send."
										);
									}
								}}
								readOnly
							/>
						</div>
					</div>
					<div className='mb-4'>
						<textarea
							className='form-control p-3 blackBorder'
							placeholder='Message'
							name='message'
							ref={message}
							required
							maxLength={'500'}
							readOnly={user === null ? true : false}
							onClick={() => {
								isUserNull(user,navigate);
							}}
							rows='3'></textarea>
					</div>
					<button
						disabled={loading}
						className='d-flex align-items-center button font-lato lh-sm'
						type='submit'>
						Send Message
						{user === null ? (
							<svg
								stroke='currentColor'
								fill='currentColor'
								strokeWidth='0'
								viewBox='0 0 24 24'
								height='1.5rem'
								width='1.5rem'
								xmlns='http://www.w3.org/2000/svg'>
								<path d='M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm6 10 .002 8H6v-8h12zm-9-2V7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9z'></path>
							</svg>
						) : (
							''
						)}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Contact;
