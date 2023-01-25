import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	initialLoading: true
};

const loadingSlice = createSlice({
	name: 'initialLoading',
	initialState,

	reducers: {
		setInitialLoading(state, action) {
			state.initialLoading = action.payload;
		}
	}
});

export const { setInitialLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
