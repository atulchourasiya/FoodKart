import { setCurrentMenuName, setHighlightMenu, setMenuState } from '../../Redux/Slices/menuSlice';
import { showToast } from '../Login/loginFunc';

export const handleSearch = (MenuArray, dispatch) => {
	if (MenuArray !== null && MenuArray.length > 0) {
		const searchField = document.getElementById('searchField');
		if (searchField.value === '') {
			return;
		}
		let isMatch = false;
		MenuArray?.every((item) => {
			if (item.name === searchField.value) {
				isMatch = true;
				dispatch(setMenuState(item.category));
				dispatch(setCurrentMenuName(item.categoryName));
				dispatch(setHighlightMenu(item.name));
				searchField.value = '';
				document.getElementById('menuNavigation').click();
				const removeHighlightTimer = setTimeout(() => {
					dispatch(setHighlightMenu(false));
					clearTimeout(removeHighlightTimer);
				}, 3000);
				return false;
			}
			return true;
		});
		if (!isMatch) {
			showToast(
				'warning',
				`Sorry! ${searchField.value} is not in our menu! Please select the item from list.`
			);
		}
	} else {
		showToast('error', 'Failed to fetch menu details, please reload or try again later');
	}
};
