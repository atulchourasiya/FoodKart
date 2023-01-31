import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showToast } from '../../Component/Login/loginFunc';

const initialState = {
	CategoryArray: null
};

export const fetchCategory = createAsyncThunk('category/fetchcategory', async (_, { dispatch }) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_API_HOST}/category/fetchcategory`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.status === 200) {
			const json = await response.json();
			return json;
		}  else throw new Error('Something went wrong!');
	} catch (err) {
		console.error(err);
		showToast('error', 'Failed to fetch category details, please reload or try again later');
		return [];
	}
});

const categorySlice = createSlice({
	name: 'Category',
	initialState,
	extraReducers: {
		[fetchCategory.fulfilled]: (state, action) => {
			state.CategoryArray = [...action.payload];
		},
		[fetchCategory.rejected]: (state) => {
			state.CategoryArray = [];
		}
	}
});

export default categorySlice.reducer;
