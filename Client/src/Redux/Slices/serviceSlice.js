import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showToast } from '../../Component/Login/loginFunc';

const initialState = {
	ServiceArray: null
};

export const fetchService = createAsyncThunk(
	'service/fetchservice',
	async (_, { dispatch }) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API_HOST}/service/fetchservice`, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.status === 200) {
				const json = await response.json();
				return json;
			} else throw new Error('Something went wrong!');
		} catch (err) {
			console.error(err);
			showToast('error', 'Failed to fetch service details, please reload or try again later');
			return [];
		}
	}
);

const serviceSlice = createSlice({
	name: 'Service',
	initialState,
	extraReducers: {
		[fetchService.fulfilled]: (state, action) => {
			state.ServiceArray = [...action.payload];
		},
		[fetchService.rejected]: (state) => {
			state.ServiceArray = [];
		}
	}
});

export default serviceSlice.reducer;
