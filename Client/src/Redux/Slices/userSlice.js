import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showToast } from '../../Component/Login/loginFunc';

const initialState = {
	user: null,
};

export const addUser = createAsyncThunk(
	'user/adduser',
	async (user, { dispatch }) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API_HOST}/user/adduser`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});
			if (response.status === 200) {
				showToast('success', 'Account created successfully.');
			} else throw new Error('Something went wrong!');
		} catch (err) {
			showToast('error', 'Something went wrong.');
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState
});
export default userSlice.reducer;
