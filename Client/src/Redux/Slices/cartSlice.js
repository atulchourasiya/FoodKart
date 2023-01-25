import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showToast } from '../../Component/Login/loginFunc';

const initialState = {
	cartArray: null,
	subTotal: 0,
	orderID:0,
};

export const fetchCartProduct = createAsyncThunk(
	'cart/fetchCartProduct',
	async (user, { dispatch }) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API_HOST}/cart/fetchproduct`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Credentials': true
				},
				body: JSON.stringify({ user })
			});
			if (response.status === 200) {
				const json = await response.json();
				return json;
			} else throw new Error('Something went wrong!');
		} catch (error) {
			showToast('error', 'Failed to fetch cart details, please reload or try again later');
			console.error(error);
			return [];
		}
	}
);

export const addCartProduct = createAsyncThunk(
	'cart/addCartProduct',
	async (product, { dispatch }) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API_HOST}/cart/addproduct`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(product)
			});
			if (response.status === 200) {
				const res = await response.json();
				showToast('success', 'Added to cart successfully.');
				dispatch(fetchCartProduct(product.user));
				return res;
			} else throw new Error('Something went wrong!');
		} catch (error) {
			console.error(error);
			showToast('error', 'Something went wrong');
		}
	}
);

export const updatedCartProduct = createAsyncThunk(
	'cart/updatedCartProduct',
	async (product, { dispatch }) => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_HOST}/cart/updateproduct/${product.id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ user: product.user, quantity: product.quantity })
				}
			);
			if (response.status === 200) {
				const res = await response.json();
				dispatch(fetchCartProduct(product.user));
				return res;
			} else throw new Error('Something went wrong!');
		} catch (error) {
			console.error(error);
			showToast('error', 'Something went wrong');
		}
	}
);

export const deleteCartProduct = createAsyncThunk(
	'cart/deleteCartProduct',
	async (product, { dispatch }) => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_HOST}/cart/deleteproduct/${product.id}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ user: product.user })
				}
			);
			if (response.status === 200) {
				const res = await response.json();
				dispatch(fetchCartProduct(product.user));
				showToast('success', `${product.name} removed successfully.`);
				return res;
			} else throw new Error('Something went wrong!');
		} catch (error) {
			console.error(error);
			showToast('error', 'Something went wrong');
		}
	}
);

const cartSlice = createSlice({
	name: 'Cart',
	initialState,
	extraReducers: {
		[fetchCartProduct.fulfilled]: (state, action) => {
			state.cartArray = [...action.payload];
		},
		[fetchCartProduct.rejected]: (state, action) => {
			state.cartArray = [];
		}
	},
	reducers: {
		setCartArray(state, action) {
			state.cartArray = action.payload;
		},
		setSubTotal(state, action) {
			state.subTotal = action.payload;
		},
		setOrderID(state){
			state.orderID = Math.floor(Math.random() * Date.now());
		}
	}
});

export const { setCartArray ,setSubTotal,setOrderID} = cartSlice.actions;
export default cartSlice.reducer;
