import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showToast } from '../../Component/Login/loginFunc';

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
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Credentials': true
				},
				body: JSON.stringify({ user })
			});
			if (response.status === 200) {
				const json = await response.json();
				if (json.length === 0) {
					return null;
				} else return json[0].date;
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
