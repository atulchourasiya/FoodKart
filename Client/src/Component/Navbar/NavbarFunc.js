import { logout, setUser } from '../../Redux/Slices/authSlice';
import { setCartArray } from '../../Redux/Slices/cartSlice';
import { getToken, setToken } from '../../Redux/Slices/userSlice';
import { showToast } from '../Login/loginFunc';
let refreshTokenTimer = null;
export const handleScroll = () => {
	const navbar = document.getElementById('navbar');
	const currentColor = document.getElementsByClassName('currentColor');
	const lineColor = document.getElementsByClassName('lineColor');
	var lastScroll = 0;
	window.addEventListener('scroll', () => {
		let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
		if (currentScroll > 0 && lastScroll <= currentScroll) {
			lastScroll = currentScroll;
			navbar.classList.add('d-none');
		} else if (currentScroll === 0 && lastScroll >= currentScroll) {
			navbar.classList.remove('d-none');
			navbar.classList.replace('bg-light', 'bg-transparent');
			navbar.classList.replace('navbar-light', 'navbar-dark');
			Array.from(currentColor).forEach((item, index) => {
				item.style.fill = 'white';
			});
			Array.from(lineColor).forEach((item) => (item.style.backgroundColor = 'white'));
			lastScroll = currentScroll;
		} else {
			lastScroll = currentScroll;
			navbar.classList.remove('d-none');
			navbar.classList.replace('bg-transparent', 'bg-light');
			navbar.classList.replace('navbar-dark', 'navbar-light');
			Array.from(currentColor).forEach((item, index) => {
				item.style.fill = 'black';
			});
			Array.from(lineColor).forEach((item) => (item.style.backgroundColor = 'black'));
		}
	});
};

export const refreshToken = (dispatch, token) => {
	if (refreshTokenTimer) {
		clearInterval(refreshTokenTimer);
	}
	refreshTokenTimer = setInterval(() => {
		dispatch(getToken(token));
	}, 1000 * 60 * 60);
};

export const handleCurrentcolor = () => {
	let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
	const currentColor = document.getElementsByClassName('currentColor');
	if (currentScroll === 0) {
		Array.from(currentColor).forEach((item, index) => {
			item.style.fill = 'white';
		});
	} else {
		Array.from(currentColor).forEach((item, index) => {
			item.style.fill = 'black';
		});
	}
};

export const toggleSidebar = () => {
	const Sidebar = document.getElementById('sidebarSectionContainer');
	if (Sidebar.classList.contains('sidebarOpen')) {
		Sidebar.classList.remove('sidebarOpen');
	} else Sidebar.classList.add('sidebarOpen');
};

export const toggleCart = (user,navigate = null) => {
	if (user === null) {
		showToast('warning', 'You need to login to unlock cart feature');
		if(navigate!==null){
			navigate('/login')
		}
		return;
	}
	const Cart = document.getElementById('cartSectionContainer');
	if (Cart.classList.contains('cartOpen')) {
		Cart.classList.remove('cartOpen');
	} else Cart.classList.add('cartOpen');
};

export const logoutUser = async (dispatch) => {
	const Cart = document.getElementById('cartSectionContainer');
	const orderContainer = document.getElementById('orderSectionContainer');
	orderContainer?.classList.remove('orderOpen');
	Cart?.classList.remove('cartOpen');
	await logout();
	dispatch(setUser(null));
	dispatch(setCartArray([]));
	dispatch(setToken(false));
	clearInterval(refreshTokenTimer);
	refreshTokenTimer = null;
};

export const highlightNavlink = (about, service) => {
	if (isElementVisible(document.getElementById('aboutSectionContainer'))) {
		about?.current.classList.add('highlight');
		service?.current.classList.remove('highlight');
	} else if (isElementVisible(document.getElementById('serviceSectionContainer'))) {
		about?.current.classList.remove('highlight');
		service?.current.classList.add('highlight');
	} else {
		service?.current.classList.remove('highlight');
		about?.current.classList.remove('highlight');
	}
};

export const isElementVisible = (el) => {
	if (el !== null) {
		var rect = el.getBoundingClientRect(),
			vWidth = window.innerWidth || document.documentElement.clientWidth,
			vHeight = window.innerHeight || document.documentElement.clientHeight,
			efp = function (x, y) {
				return document.elementFromPoint(x, y);
			};

		if (rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || rect.top > vHeight) return false;
		return (
			el.contains(efp(rect.left + rect.width * 0.8, rect.top + rect.height * 0.8)) ||
			el.contains(efp(rect.right - rect.width * 0.8, rect.top + rect.height * 0.8)) ||
			el.contains(efp(rect.right - rect.width * 0.8, rect.bottom - rect.height * 0.8)) ||
			el.contains(efp(rect.left + rect.width * 0.8, rect.bottom - rect.height * 0.8))
		);
	} else {
		return false;
	}
};
