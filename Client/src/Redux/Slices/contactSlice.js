import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showToast } from '../../Component/Login/loginFunc';
import { logoutUser } from '../../Component/Navbar/NavbarFunc';

const initialState = {
	LastContactDate: null
};

export const fetchLastContact = createAsyncThunk(
	'contact/fetchlastcontact',
	async (user, { dispatch }) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API_HOST}/contact/fetchlastcontact`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ user })
			});
			if (response.status === 200) {
				const json = await response.json();
				if (json.length === 0) {
					return null;
				} else return json[0].date;
			} else if (response.status === 401) {
				showToast('warning', 'Your login session is expired login again to continue');
				logoutUser(dispatch);
				return null;
			} else throw new Error('Something went wrong!');
		} catch (err) {
			console.error(err);
			showToast('error', 'Failed to fetch contact details, please reload or try again later');
			return null;
		}
	}
);

export const addContact = createAsyncThunk('contact/addContact', async (contact, { dispatch }) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_API_HOST}/contact/addcontact`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(contact)
		});
		if (response.status === 200) {
			const res = await response.json();
			showToast('success', 'Message sent successfully to the owner.');
			dispatch(fetchLastContact(contact.user));
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

const contactSlice = createSlice({
	name: 'Contact',
	initialState,
	extraReducers: {
		[fetchLastContact.fulfilled]: (state, action) => {
			state.LastContactDate = action.payload;
		},
		[fetchLastContact.rejected]: (state) => {
			state.LastContactDate = null;
		}
	}
});

export default contactSlice.reducer;
