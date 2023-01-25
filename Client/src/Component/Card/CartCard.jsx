import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCartProduct, updatedCartProduct } from '../../Redux/Slices/cartSlice';
import { showToast } from '../Login/loginFunc';

const CartCard = (props) => {
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(props.quantity);
	return (
		<div className='row m-3 mt-0 border rounded p-2 '>
			<div className='col-4 d-flex flex-wrap justify-content-center align-items-center'>
				<img src={`/images/${props.img}`} style={{ width: '5rem', height: '5rem' }}></img>
				<div className='mx-3 w-100 '>
					<h6 className='text-center font-lato fw-bold m-0'>{props.name}</h6>
					<p className='text-center font-cursive fw-light'>{props.description}</p>
				</div>
			</div>
			<div className='col-4 d-flex align-items-center justify-content-center'>
				<p
					className='button d-flex align-items-center justify-content-center p-1 mx-2 fw-bold '
					style={{ width: '2rem' }}
					onClick={() => {
						if (quantity !== 1) {
							let value = quantity-1;
							dispatch(updatedCartProduct({ id: props.id, quantity:value, user: props.user }));
							setQuantity(value);
						} else {
							showToast('warning', `Quantity can't be less than 1.`);
						}
					}}>
					-
				</p>
				<div
					className='p-3 font-lato rounded d-flex align-items-center justify-content-center '
					style={{ border: '1px solid gray', width: '1rem', height: '1rem' }}>
					{quantity}
				</div>
				<p
					className='button d-flex align-items-center justify-content-center p-1 mx-2 fw-bold '
					style={{ width: '2rem' }}
					onClick={() => {
						if (quantity < 10) {
							let value = quantity + 1;
							dispatch(updatedCartProduct({ id: props.id, quantity: value, user: props.user }));
							setQuantity(value);
						}
						else {
							showToast('warning', `Quantity can't be more than 10.`);
						}
					}}>
					+
				</p>
			</div>
			<div className='col-4 d-flex align-items-center justify-content-center position-relative'>
				<button
					type='button'
					className='position-absolute'
					style={{ top: '0%', right: '0%' }}
					onClick={() => {
						dispatch(deleteCartProduct({ id: props.id, user: props.user, name: props.name }));
					}}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='1rem'
						height='1rem'
						fill='currentColor'
						className='bi bi-trash3'
						viewBox='0 0 16 16'>
						<path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z' />
					</svg>
				</button>
				<p className=' fw-bold font-lato'>&#8377;{quantity * Number(props.price)}</p>
			</div>
		</div>
	);
};

export default CartCard;
