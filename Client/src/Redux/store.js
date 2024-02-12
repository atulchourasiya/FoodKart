import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slices/authSlice';
import cartSlice from './Slices/cartSlice';
import categorySlice from './Slices/categorySlice';
import contactSlice from './Slices/contactSlice';
import loadingSlice from './Slices/loadingSlice';
import menuSlice from './Slices/menuSlice';
import orderSlice from './Slices/orderSlice';
import reservationSlice from './Slices/reservationSlice';
import serviceSlice from './Slices/serviceSlice';
import testimonialSlice from './Slices/testimonialSlice';
import userSlice from './Slices/userSlice';
import paymentSlice from './Slices/paymentSlice';

const store = configureStore({
	reducer: {
		menuState: menuSlice,
		authState: authSlice,
		cartState: cartSlice,
		userState: userSlice,
		categoryState: categorySlice,
		contactState: contactSlice,
		testimonialState:testimonialSlice,
		serviceState:serviceSlice,
		orderState:orderSlice,
		paymentState:paymentSlice,
		reservationState: reservationSlice,
		initialLoadingState: loadingSlice
	}
});

export default store;
