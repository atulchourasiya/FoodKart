import './Order.css';
import { useRef, useState } from 'react';
import { validateInput } from '../Login/signUpFunc';
import { openCloseOrderPage, } from '../Sidebar/CartFunc';
import { useDispatch, useSelector } from 'react-redux';
import { checkIfValid } from './OrderFunc';
import { showToast } from '../Login/loginFunc';
import { initializePayment } from '../../Redux/Slices/paymentSlice';

const Order = () => {
	const [paymentState, setPaymenState] = useState(true);
	const { user } = useSelector((state) => state.authState);
	const { subTotal } = useSelector((state) => state.cartState);
	const { orderID } = useSelector((state) => state.cartState);
	const dispatch = useDispatch();
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
					onClick={() => {
						openCloseOrderPage();
					}}
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
					if (!checkIfValid(mobile, postalcode, houseno, address)) {
						showToast('warning', 'Please review the fields marked in red.');
						return;
					}
					else {
						dispatch(
              initializePayment([
                {
                  orderId: orderID,
                  user: user.email,
                  name: user.name,
                  amount: subTotal + Math.ceil(subTotal * 0.18),
                  mobile: mobile.current.value,
                  address: address.current.value,
                  postalcode: postalcode.current.value,
                  houseno: houseno.current.value,
                },
                {...user},
              ])
            );
					}
				}}>
				<div className='col-md-6 inputOrderField'>
					<input
						type='text'
						id='mobileField'
						className='form-control lh-5 is-valid'
						ref={mobile}
						onInput={(event) => {
							validateInput(event, /^[6789]\d{9}$/);
							let valid = checkIfValid(mobile, postalcode, houseno, address);
							setPaymenState(valid);
						}}
						placeholder={'Mobile No.'}
						defaultValue={1234567890}
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
						id='postalField'
						className='form-control lh-5 is-valid'
						ref={postalcode}
						placeholder='Postal Code'
						defaultValue={462001}
						onInput={(event) => {
							validateInput(event, /^[1-9][0-9]{5}$/);
							let valid = checkIfValid(mobile, postalcode, houseno, address);
							setPaymenState(valid);
						}}
						required></input>
					<div className='valid-feedback'>Looks good!</div>
					<div className='invalid-feedback'>Postal code must be a valid zip code of bhopal.</div>
				</div>
				<div className='col-md-6 inputOrderField'>
					<input
						type='text'
						id='housenoField'
						className='form-control lh-5 is-valid'
						placeholder='House No.'
						defaultValue={123}
						ref={houseno}
						onInput={(event) => {
							validateInput(event, /^(.|\n){1,20}$/);
							let valid = checkIfValid(mobile, postalcode, houseno, address);
							setPaymenState(valid);
						}}
						required></input>
					<div className='valid-feedback'>Looks good!</div>
					<div className='invalid-feedback'>House No. must be a under 20 character.</div>
				</div>
				<div className='col-md-6 inputOrderField'>
					<input
						type='text'
						id='addressField'
						className='form-control lh-5 is-valid'
						ref={address}
						placeholder='Address'
						defaultValue={'Ward No. 1, Bhopal, MP, India.'}
						onInput={(event) => {
							validateInput(event, /^(.|\n){10,499}$/);
							let valid = checkIfValid(mobile, postalcode, houseno, address);
							setPaymenState(valid);
						}}
						required></input>
					<div className='valid-feedback'>Looks good!</div>
					<div className='invalid-feedback'>Address must have atleast 15 Character.</div>
				</div>
				<div className='d-flex'>
					<button id='submitbtn' className='button px-4' disabled={!paymentState} type='submit'> Pay Now</button>
				</div>
			</form>
		</div>
	);
};

export default Order;
