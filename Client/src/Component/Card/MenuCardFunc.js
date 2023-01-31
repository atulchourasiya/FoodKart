import { addCartProduct } from '../../Redux/Slices/cartSlice';
import { showToast } from '../Login/loginFunc';

export const handleAddToCart = (props, user, cartArray, dispatch, setBlock,navigate) => {
	setBlock(true);
	if (user === null) {
		showToast('warning', 'You need to login to unlock cart feature');
		navigate('/login')
		setBlock(false);
	} else {
		if (cartArray === null) {
			showToast('error', 'Failed to fetch cart details, please reload or try again later');
			setBlock(false);
		} else if (cartArray.length >= 10) {
			showToast('warning', 'Cart limit is max 10 products.');
			setBlock(false);
		} else {
			let isPresent = false;
			cartArray.every((item) => {
				if (item.productid === props.productid) {
					isPresent = true;
					return false;
				}
				return true;
			});
			if (isPresent) {
				showToast('warning', 'Item is already in cart, you can increase quantity from there.');
			} else
				dispatch(
					addCartProduct({
						user: user.email,
						img: props.img,
						productid: props.productid,
						quantity: 1,
						description: props.description,
						price: props.price,
						name: props.name
					})
				);
		}
	}
};
