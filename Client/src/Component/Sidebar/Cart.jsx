import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartCard from '../Card/CartCard';
import { toggleCart } from '../Navbar/NavbarFunc';
import BeatLoader from 'react-spinners/BeatLoader';
import './Cart.css';
import { getSubTotal, openCloseOrderPage } from './CartFunc';
import { setOrderID, setSubTotal } from '../../Redux/Slices/cartSlice';
import { showToast } from '../Login/loginFunc';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
	const { user } = useSelector((state) => state.authState);
	let { cartArray } = useSelector((state) => state.cartState);
	let { subTotal } = useSelector((state) => state.cartState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		if (cartArray !== null && cartArray.length > 0) {
			dispatch(setSubTotal(getSubTotal(cartArray)));
		}
	}, [cartArray]);
	return (
		<div id='cartSectionContainer' className='rounded bg-light'>
			<div className='d-flex  align-items-center justify-content-center' style={{ height: '4rem' }}>
				<h6 className='font-lato m-auto fs-2 fw-bold'>
					My Cart
					<svg
						stroke='currentColor'
						fill='currentColor'
						className='d-inline mx-2'
						strokeWidth='0'
						viewBox='0 0 16 16'
						height='1em'
						width='1em'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z'></path>
					</svg>
				</h6>
				<button
					type='button'
					data-cartbutton
					onClick={_=>toggleCart(user,navigate)}
					className='btn-close me-2 position-absolute'
					aria-label='Close'
					style={{ right: '0' }}></button>
			</div>
			<hr className='my-1' />
			{cartArray !== null && cartArray.length !== 0 ? (
				<div className='row mx-3' style={{ height: '3rem' }}>
					<p className='col-4 d-flex align-items-center justify-content-center fw-bold font-heebo fs-4'>
						Product
					</p>
					<p className='col-4 d-flex align-items-center justify-content-center fw-bold font-heebo fs-4'>
						Quantity
					</p>
					<p className='col-4 d-flex align-items-center justify-content-center fw-bold font-heebo fs-4'>
						Price
					</p>
				</div>
			) : (
				''
			)}
			<div className='cartproduct'>
				{cartArray !== null ? (
					cartArray.length !== 0 ? (
						cartArray?.map((item, index) => {
							return (
								<CartCard
									key={`cartcard${index}`}
									user={item.user}
									id={item._id}
									name={item.name}
									quantity={item.quantity}
									img={item.img}
									price={item.price}
									description={item.description}
								/>
							);
						})
					) : (
						<div className='position-relative h-100'>
							<div
								className='position-absolute d-flex align-items-center flex-column justify-content-center'
								style={{
									left: '50%',
									top: '50%',
									transform: 'translateX(-50%)'
								}}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='6rem'
									height='6rem'
									fill='currentColor'
									className='bi bi-cart2'
									viewBox='0 0 16 16'>
									<path d='M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z' />
								</svg>
								<h5 className='fs-3  my-2 fw-bold font-heebo'>Cart is empty</h5>
							</div>
						</div>
					)
				) : (
					<div className='position-relative h-100'>
						<div
							className='position-absolute'
							style={{
								left: '50%',
								top: '60%',
								transform: 'translateX(-50%)'
							}}>
							<BeatLoader size={'1rem'} color='#8686869f' />
						</div>
					</div>
				)}
			</div>
			{cartArray !== null && cartArray.length !== 0 ? (
				<div
					className='py-2 d-flex align-items-end flex-column'
					style={{ backgroundColor: '#fff' }}>
					<div
						className='d-flex  mb-1 justify-content-between me-3  font-heebo fw-bold'
						style={{ width: '12rem' }}>
						<span>Sub total:</span>
						<span>&#8377;{subTotal}</span>
					</div>
					<div
						className='d-flex mb-1  justify-content-between  me-3 font-heebo fw-bold'
						style={{ width: '12rem' }}>
						<span>Tax:</span>
						&#8377;{Math.ceil(subTotal * 0.18)}
					</div>
					<div className='d-flex me-3 justify-content-end'>
						<hr className='my-1' style={{ width: '12rem' }} />
					</div>
					<div
						className='d-flex mb-1  justify-content-between me-3  font-heebo fw-bold'
						style={{ width: '12rem' }}>
						<span>Total:</span>
						&#8377;{subTotal + Math.ceil(subTotal * 0.18)}
					</div>
					<div className='d-flex justify-content-end me-3'>
						<button
							onClick={(_) =>
								user !== null
									? (function () {
											dispatch(setOrderID());
											openCloseOrderPage();
									  })()
									: (function () {
											showToast('warning', 'You need to login to unlock this feature');
											navigate('/login')
									  })()
							}
							className='button font-lato'
							style={{ width: 'max-content' }}>
							Proceed to checkout
						</button>
					</div>
				</div>
			) : (
				''
			)}
		</div>
	);
};

export default Cart;
