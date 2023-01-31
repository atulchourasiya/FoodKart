import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showToast } from '../../Component/Login/loginFunc';
import { logoutUser } from '../../Component/Navbar/NavbarFunc';

const initialState = {
	token: null
};

export const addUser = createAsyncThunk('user/adduser', async (user, { dispatch }) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_API_HOST}/user/adduser`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify(user)
		});
		if (response.status === 200) {
			dispatch(setToken(true));
			showToast('success', 'Account created successfully.');
		} else {
			showToast('error', 'Something went wrong cannot able to establish session.');
			dispatch(setToken(false));
			logoutUser(dispatch);
			throw new Error('Something went wrong!');
		}
	} catch (err) {
		showToast('error', 'Something went wrong.');
	}
});

export const getToken = createAsyncThunk('user/gettoken', async (userid, { dispatch }) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_API_HOST}/user/gettoken`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({ userid })
		});
		if (response.status === 200) {
			dispatch(setToken(true));
		} else {
			showToast('error', 'Something went wrong cannot able to establish session.');
			dispatch(setToken(false));
			logoutUser(dispatch);
			throw new Error('Something went wrong!');
		}
	} catch (err) {
		console.log(err);
	}
});

export const check = createAsyncThunk('user/checktoken', async(_,{ dispatch }) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_API_HOST}/user/checktoken`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.status === 200) {
			dispatch(setToken(true));
		} else {
			dispatch(setToken(false));
			logoutUser(dispatch);
		}
	} catch (err) {
		console.log(err);
	}
});

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setToken(state, action) {
			state.token = action.payload;
		}
	}
});

export const { setToken } = userSlice.actions;
export default userSlice.reducer;
