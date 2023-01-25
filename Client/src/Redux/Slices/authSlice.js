import { auth } from '../../firebase';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null
};
const authSlice = createSlice({
	name: 'Auth',
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
		}
	}
});

export const createUser = (email, password) => {
	return auth.createUserWithEmailAndPassword(email, password);
};

export const login = (email, password) => {
	return auth.signInWithEmailAndPassword(email, password);
};

export const logout = () => {
	return auth.signOut();
};

export const resetPassword = (email) => {
	return auth.sendPasswordResetEmail(email);
};

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
