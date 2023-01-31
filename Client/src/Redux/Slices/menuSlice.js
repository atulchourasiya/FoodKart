import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showToast } from '../../Component/Login/loginFunc';

const initialState = {
	MenuArray: null,
	currentMenu: 'burger',
	currentMenuName: 'Burger',
	highlightMenu: false
};

export const fetchMenu = createAsyncThunk('menu/fetchmenu', async (_, { dispatch }) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_API_HOST}/menu/fetchmenu`, {
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
		showToast('error', 'Failed to fetch menu details, please reload or try again later');
		return [];
	}
});

const menuSlice = createSlice({
	name: 'Menu',
	initialState,
	extraReducers: {
		[fetchMenu.fulfilled]: (state, action) => {
			state.MenuArray = [...action.payload];
		},
		[fetchMenu.rejected]: (state) => {
			state.MenuArray = [];
		}
	},
	reducers: {
		setMenuState(state, action) {
			state.currentMenu = action.payload;
		},
		setCurrentMenuName(state, action) {
			state.currentMenuName = action.payload;
		},
		setHighlightMenu(state, action) {
			state.highlightMenu = action.payload;
		}
	}
});

export const { setMenuState, setCurrentMenuName, setHighlightMenu } = menuSlice.actions;
export default menuSlice.reducer;
