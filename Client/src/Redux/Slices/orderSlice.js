import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showToast } from '../../Component/Login/loginFunc';
import { logoutUser } from '../../Component/Navbar/NavbarFunc';

const initialState = {
	order : null
};

export const addOrder = createAsyncThunk('order/addOrder', async (order, { dispatch }) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_API_HOST}/order/addorder`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(order)
		});
		if (response.status === 200) {
			const res = await response.json();
			console.log(res);
			return res;
		} else if (response.status === 401) {
			showToast('warning', 'Your login session is expired login again to continue');
			logoutUser(dispatch);
		} else throw new Error('Something went wrong!');
	} catch (error) {
		console.error(error);
		showToast('error', 'Something went wrong while sending message.');
	}
});

const orderSlice = createSlice({
	name: 'Order',
	initialState,
	reducers: {
		setOrderState(state, action) {
			state.order = action.payload;
		},
	}
});

export const { setOrderState } = orderSlice.actions;
export default orderSlice.reducer;
