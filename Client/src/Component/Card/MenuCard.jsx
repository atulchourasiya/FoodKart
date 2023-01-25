import { useDispatch, useSelector } from 'react-redux';
import './MenuCard.css';
import { handleAddToCart } from './MenuCardFunc';
import { useState,useEffect } from 'react';
const MenuCard = (props) => {
	const { user } = useSelector((state) => state.authState);
	const { cartArray } = useSelector((state) => state.cartState);
	const [block, setBlock] = useState(false);
	const dispatch = useDispatch();
	useEffect(()=>{
		setBlock(false);
	},[cartArray])
	return (
		<>
			<div
				className={
					props.highlight === false
						? 'pb-4 p-1 m-1  d-flex align-items-center justify-content-center flex-column'
						: 'highlightedMenu m-1 rounded p-1 pb-4  d-flex align-items-center justify-content-center flex-column'
				}
				style={{
					maxWidth: '15rem'
				}}>
				<img src={`/images/${props.img}`} style={{ width: '8rem', height: '8rem' }} alt='' />
				<h6 className='d-flex text-center font-heebo fw-bold my-2'>
					{props.name} &#8377;{props.price}
				</h6>
				<p className='text-center mb-2 font-heebo'>
					{props.description ?? 'Lorem ipsum dolor sit amet consectetur,'}
				</p>
				<button
					disabled={block}
					className='button'
					onClick={() => {
						setBlock(true);
						handleAddToCart(props, user, cartArray, dispatch);
					}}>
					Add To Cart
				</button>
			</div>
		</>
	);
};

export default MenuCard;
