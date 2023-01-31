import Heading from '../Heading/Heading';
import { validateInput } from '../Login/signUpFunc';
import { handleReservationFormSubmit, maxDate, minDate } from './ReservationFunc';
import { useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { isUserNull } from '../Contact/ContactFunc';
import { useNavigate } from 'react-router-dom';

const Reservation = () => {
	const { user } = useSelector((state) => state.authState);
	const { reservationLoading } = useSelector((state) => state.reservationState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const firstname = useRef();
	const lastname = useRef();
	const mobile = useRef();
	const date = useRef();
	const time = useRef();
	const seat = useRef();
	const request = useRef();
	return (
		<div id='reservationSectionContainer'>
			<Heading heading={'Make A Reservation'} subheading={'Reservation'} position={'center'} />
			<form
				className='row g-3 p-4'
				onSubmit={(event) => {
					event.preventDefault();
					handleReservationFormSubmit(
						user,
						firstname,
						lastname,
						mobile,
						seat,
						date,
						time,
						request,
						dispatch,
						navigate
					);
				}}>
				<div className='col-md-4'>
					<label htmlFor='firstNameField' className='form-label font-lato'>
						First name
					</label>
					<input
						ref={firstname}
						readOnly={user === null ? true : false}
						onClick={() => {
							isUserNull(user,navigate);
						}}
						type='text'
						className='form-control'
						id='firstNameField'
						onInput={(event) => {
							validateInput(event, /^(?=[ ]*[a-zA-Z]{2})[A-Za-z ]{2,10}$/);
						}}
						placeholder='Mark'
						required
					/>
					<div className='valid-feedback'>Looks good!</div>
					<div className='invalid-feedback'>
						First Name must have 2-10 alphabet & spaces allowed.
					</div>
				</div>
				<div className='col-md-4'>
					<label htmlFor='lastNameField' className='form-label font-lato'>
						Last name
					</label>
					<input
						type='text'
						ref={lastname}
						readOnly={user === null ? true : false}
						onClick={() => {
							isUserNull(user,navigate);
						}}
						className='form-control'
						id='lastNameField'
						onInput={(event) => {
							validateInput(event, /^(?=[ ]*[a-zA-Z]{2})[A-Za-z ]{2,10}$/);
						}}
						placeholder='Otto'
						required
					/>
					<div className='valid-feedback'>Looks good!</div>
					<div className='invalid-feedback'>
						Last Name must have 2-10 alphabet & spaces allowed.
					</div>
				</div>
				<div className='col-md-4'>
					<label htmlFor='phoneField' className='form-label font-lato'>
						Mobile Number
					</label>
					<div className='input-group has-validation'>
						<input
							type='text'
							className='form-control'
							ref={mobile}
							readOnly={user === null ? true : false}
							onClick={() => {
								isUserNull(user,navigate);
							}}
							id='phoneField'
							onInput={(event) => {
								validateInput(event, /^[6789]\d{9}$/);
							}}
							placeholder={'1234567890'}
							required
						/>
						<div className='valid-feedback'>Looks good!</div>
						<div className='invalid-feedback'>
							Mobile Number must be valid & only have 10 digit,country code isn't required.
						</div>
					</div>
				</div>
				<div className='col-md-4'>
					<label htmlFor='dateField' className='form-label font-lato'>
						Date
					</label>
					<input
						min={minDate()}
						max={maxDate()}
						ref={date}
						readOnly={user === null ? true : false}
						onClick={() => {
							isUserNull(user,navigate);
						}}
						placeholder='dd-mm-yyyy'
						type='date'
						onInput={(event) => {
							validateInput(
								event,
								/([2][0][2][3])-([0][123456789]|[1][012)])-([0][123456789]|[12][0-9]|[3][01])/
							);
						}}
						className='form-control'
						id='dateField'
						required
					/>
					<div className='valid-feedback'>Looks good!</div>
					<div className='invalid-feedback'>Date must be in proper format & within 1 month</div>
				</div>
				<div className='col-md-4'>
					<label htmlFor='timeField' className='form-label font-lato'>
						Time
					</label>
					<input
						type='time'
						min={'10:00'}
						max={'22:00'}
						ref={time}
						readOnly={user === null ? true : false}
						onClick={() => {
							isUserNull(user,navigate);
						}}
						onInput={(event) => {
							validateInput(event, /([1][0-9]|[2][01])[:]([0-5][0-9])|(22:00)/);
						}}
						className='form-control'
						id='timeField'
						required
					/>
					<div className='valid-feedback'>Looks good!</div>
					<div className='invalid-feedback'>Time must be between 10:00AM-10:00PM</div>
				</div>
				<div className='col-md-4'>
					<label htmlFor='seatField' className='form-label font-lato'>
						Seat
					</label>
					<input
						type='number'
						min={'1'}
						max={'10'}
						ref={seat}
						readOnly={user === null ? true : false}
						onClick={() => {
							isUserNull(user,navigate);
						}}
						placeholder='1'
						onInput={(event) => {
							validateInput(event, /^(0?[1-9]|10)$/);
						}}
						className='form-control'
						id='seatField'
						required
					/>
					<div className='valid-feedback'>Looks good!</div>
					<div className='invalid-feedback'>Seat must be between 1-10</div>
				</div>
				<div className='mb-3'>
					<label htmlFor='requestField' className='form-label'>
						Special request
					</label>
					<textarea
						className='form-control'
						id='requestField'
						ref={request}
						readOnly={user === null ? true : false}
						onClick={() => {
							isUserNull(user,navigate);
						}}
						rows='5'
						placeholder='Any Special Request'
						onInput={(event) => {
							validateInput(event, /^(.|\n){0,499}$/);
						}}></textarea>
					<div className='valid-feedback'>Looks good!</div>
					<div className='invalid-feedback'>Special request must be under 500 character</div>
				</div>
				<button
					disabled={reservationLoading}
					className='d-flex align-items-center button font-lato lh-sm w-auto'
					type='submit'>
					Make Reservation
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
			</form>
		</div>
	);
};

export default Reservation;
