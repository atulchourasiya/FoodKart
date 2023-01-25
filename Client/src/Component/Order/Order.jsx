import './Order.css';
import { useRef } from 'react';
import { validateInput } from '../Login/signUpFunc';
import { toggleOrderPage } from '../Sidebar/CartFunc';
import { useSelector } from 'react-redux';
import { handlePayment } from './OrderFunc';
const Order = () => {
	const { user } = useSelector((state) => state.authState);
	const { subTotal } = useSelector((state) => state.cartState);
	const { orderID } = useSelector((state) => state.cartState);
	const mobile = useRef();
	const postalcode = useRef();
	const houseno = useRef();
	const address = useRef();
	return (
		<div id='orderSectionContainer' className='rounded bg-light'>
			<script src='https://js.instamojo.com/v1/checkout.js'></script>
			<div className='d-flex  align-items-center justify-content-center' style={{ height: '4rem' }}>
				<h6 className='font-lato m-auto fs-2 fw-bold'>Your Order</h6>
				<button
					type='button'
					data-cartbutton
					onClick={toggleOrderPage}
					className='btn-close me-2 position-absolute'
					aria-label='Close'
					style={{ right: '0' }}></button>
			</div>
			<hr className='m-0' />
			<div className='d-flex flex-column rounded p-2 m-3 mb-0' style={{ backgroundColor: '#fff' }}>
				<div className='d-flex align-items-center justify-content-between px-4 font-lato fw-bold'>
					<div>Order ID:</div>
					<div>{orderID}</div>
				</div>
				<div className='d-flex align-items-center justify-content-between px-4 font-lato fw-bold'>
					<div>Buyer Name</div>
					<div>{user !== null ? user.name : 'Your Name'}</div>
				</div>
				<div className='d-flex align-items-center justify-content-between px-4 font-lato fw-bold'>
					<div>Buyer E-Mail</div>
					<div>{user !== null ? user.email : 'yourmail@gmail.com'}</div>
				</div>
				<div className='d-flex align-items-center justify-content-between px-4 font-lato fw-bold'>
					<div>Amount</div>
					<div> &#8377;{subTotal ? subTotal + Math.ceil(subTotal * 0.18) : ''}</div>
				</div>
			</div>
			<form
				className='row orderForm g-3 p-4 font-lato'
				onSubmit={(event) => {
					event.preventDefault();
					handlePayment(user,subTotal,orderID,mobile,postalcode,houseno,address)
				}}>
				<div className='col-md-6 inputOrderField'>
					<input
						type='text'
						className='form-control lh-5 '
						ref={mobile}
						onInput={(event) => {
							validateInput(event, /^[6789]\d{9}$/);
						}}
						placeholder={'Mobile No.'}
						required
					/>
					<div className='valid-feedback'>Looks good!</div>
					<div className='invalid-feedback'>
						Mobile Number must be valid & only have 10 digit,country code isn't required.
					</div>
				</div>
				<div className='col-md-6 inputOrderField'>
					<input
						type='text'
						className='form-control lh-5'
						ref={postalcode}
						placeholder='Postal Code'
						onInput={(event) => {
							validateInput(event, /^[1-9][0-9]{5}$/);
						}}
						required></input>
					<div className='valid-feedback'>Looks good!</div>
					<div className='invalid-feedback'>Postal code must be a valid zip code of bhopal.</div>
				</div>
				<div className='col-md-6 inputOrderField'>
					<input
						type='text'
						className='form-control lh-5'
						ref={houseno}
						placeholder='House No.'
						onInput={(event) => {
							validateInput(event, /^(.|\n){1,20}$/);
						}}
						required></input>
					<div className='valid-feedback'>Looks good!</div>
					<div className='invalid-feedback'>House No. must be a under 20 character.</div>
				</div>
				<div className='col-md-6 inputOrderField'>
					<input
						className='form-control lh-5'
						ref={address}
						placeholder='Address'
						onInput={(event) => {
							validateInput(event, /^(.|\n){20,499}$/);
						}}
						required></input>
					<div className='valid-feedback'>Looks good!</div>
					<div className='invalid-feedback'>Address must have atleast 20 Character.</div>
				</div>
				<div className='d-block'>
					<button
						className='align-items-center button font-lato lh-sm w-auto'
						type='submit'>
						Place Order
					</button>
				</div>
			</form>
		</div>
	);
};

export default Order;
