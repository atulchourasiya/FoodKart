import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showToast } from '../../Component/Login/loginFunc';

const initialState = {
	Reservation: null,
	reservationLoading: false
};

export const addReservation = createAsyncThunk(
	'reservation/addreservation',
	async (reservation, { dispatch }) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API_HOST}/reservation/addreservation`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(reservation)
			});
			if (response.status === 200) {
				showToast(
					'success',
					'Thanks for booking, We’re looking forward to seeing you at foodkart! .'
				);
			} else throw new Error('Something went wrong!');
		} catch (err) {
			showToast('error', 'Something went wrong while making reservation.');
		}
		dispatch(setReservationLoading(false));
	}
);

const reservationSlice = createSlice({
	name: 'Reservation',
	initialState,
	reducers: {
		setReservationLoading(state, action) {
			state.reservationLoading = action.payload;
		}
	}
});
export const { setReservationLoading } = reservationSlice.actions;
export default reservationSlice.reducer;
