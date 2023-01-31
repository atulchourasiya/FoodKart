import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showToast } from '../../Component/Login/loginFunc';

const initialState = {
	TestimonialArray: null
};

export const fetchTestimonial = createAsyncThunk(
	'testimonial/fetchtestimonial',
	async (_, { dispatch }) => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_HOST}/testimonial/fetchtestimonial`,
				{
					method: 'GET',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
			if (response.status === 200) {
				const json = await response.json();
				return json;
			} else throw new Error('Something went wrong!');
		} catch (err) {
			console.error(err);
			showToast('error', 'Failed to fetch testimonial details, please reload or try again later');
			return [];
		}
	}
);

const testimonialSlice = createSlice({
	name: 'Testmonial',
	initialState,
	extraReducers: {
		[fetchTestimonial.fulfilled]: (state, action) => {
			state.TestimonialArray = [...action.payload];
		},
		[fetchTestimonial.rejected]: (state) => {
			state.TestimonialArray = [];
		}
	}
});

export default testimonialSlice.reducer;
