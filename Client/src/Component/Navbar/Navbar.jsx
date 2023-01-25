import logo from '../../Assets/Image/logo.png';
import { HashLink, NavHashLink } from 'react-router-hash-link';
import './Navbar.css';
import { useEffect, useRef } from 'react';
import {
	handleCurrentcolor,
	handleScroll,
	highlightNavlink,
	logoutUser,
	toggleCart,
	toggleSidebar
} from './NavbarFunc';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { setUser } from '../../Redux/Slices/authSlice';
import userIcon from '../../Assets/Image/user.png';
import tippy from 'tippy.js';
import 'tippy.js/themes/light.css';
import { fetchCartProduct, setCartArray } from '../../Redux/Slices/cartSlice';
import { fetchLastContact } from '../../Redux/Slices/contactSlice';

function NavigationBar() {
	const { user } = useSelector((state) => state.authState);
	const { cartArray } = useSelector((state) => state.cartState);
	const dispatch = useDispatch();
	const about = useRef();
	const service = useRef();
	const highlightFunc = highlightNavlink.bind(this, about, service);
	const location = useLocation();
	const navbar = document.getElementById('navbar');
	useEffect(() => {
		highlightFunc();
		if (location.hash !== '') {
			const dissapearNavTimer = setTimeout(() => {
				navbar?.classList.add('d-none');
				clearTimeout(dissapearNavTimer);
			}, 100);
		}
	}, [location.hash]);
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user !== null && user.emailVerified) {
				dispatch(
					setUser({
						name: user.displayName,
						email: user.email,
						emailVerified: user.emailVerified
					})
				);
				dispatch(fetchCartProduct(user.email));
				dispatch(fetchLastContact(user.email));
			}
		});
		handleScroll();
		document.addEventListener('scroll', highlightFunc);
		return () => {
			document.removeEventListener('scroll', highlightFunc);
		};
	}, []);
	useEffect(() => {
		tippy('#userIconTippy', {
			content: `
				<h6 className='d-flex dropdown-header font-lato fs-1 font-weight-normal pointer'>Hi👋 ${user?.name}</h6>
			`,
			placement: 'left-start',
			allowHTML: true,
			hideOnClick: 'toggle',
			theme: 'light',
			animation: 'scale'
		});
		handleCurrentcolor();
	});

	return (
		<nav id='navbar' className='navbar navbar-expand-lg navbar-dark bg-transparent fixed-top'>
			<div className='container-fluid d-flex align-center mx-3'>
				<div className='d-flex'>
					<button
						onClick={toggleSidebar}
						data-sidebarbutton
						className='navbar-toggler'
						type='button'>
						<span className='navbar-toggler-icon'></span>
					</button>
					<NavHashLink to={'/#'} className='navbar-brand d-flex align-center'>
						<img src={logo} height={26} alt='logo' />
					</NavHashLink>
				</div>
				<div id='iconFirst' className='d-flex align-items-center justify-content-center'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='iconSize bi bi-bag-heart-fill mx-2 currentColor pointer'
						viewBox='0 0 16 16'
						data-cartbutton
						onClick={() => {
							toggleCart(user);
						}}>
						<path d='M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5ZM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1Zm0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z' />
					</svg>
					<div
						className='badge d-flex justify-content-center align-items-center p-2'
						style={{ height: '1.3rem', width: '1.3rem' }}>
						{cartArray?.length ?? 0}
					</div>
					<span className='line lineColor'></span>
					{user === null ? (
						<Link to='/login'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='iconSize bi bi-person-fill-add ms-2 currentColor pointer'
								viewBox='0 0 16 16'>
								<path d='M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
								<path d='M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z' />
							</svg>
						</Link>
					) : (
						<div className='d-flex align-items-center justify-content-center flex-column ms-3'>
							<img id='userIconTippy' src={userIcon} alt='' className=' iconSize' />
							<button className='fs-6 btn text-light font-lato  border-0 p-0'>
								<u
									style={{
										borderBottom: '1.3px solid white',
										filter: 'brightness(50%)'
									}}
									onClick={() => {
										logoutUser(dispatch);
										dispatch(setCartArray([]));
									}}>
									Logout
								</u>
							</button>
						</div>
					)}
				</div>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav ms-auto me-auto mb-2 mb-lg-0 font-lato '>
						<li className='nav-item'>
							<NavHashLink to={'/#'} exact='true' className='nav-link' aria-current='page'>
								Home
							</NavHashLink>
						</li>
						<li className='nav-item'>
							<HashLink smooth to={'/#aboutSectionContainer'} ref={about} className='nav-link'>
								About
							</HashLink>
						</li>
						<li className='nav-item'>
							<NavHashLink smooth to='/menu/#menuContainer' className='nav-link'>
								Menu
							</NavHashLink>
						</li>
						<li className='nav-item'>
							<HashLink smooth to={'/#serviceSectionContainer'} ref={service} className='nav-link'>
								Service
							</HashLink>
						</li>
						<li className='nav-item'>
							<NavHashLink smooth to={'/gallery/#gallerySectionContainer'} className='nav-link'>
								Gallery
							</NavHashLink>
						</li>
						<li className='nav-item'>
							<NavHashLink
								smooth
								to={'/reservation/#reservationSectionContainer'}
								className='nav-link'>
								Reservation
							</NavHashLink>
						</li>
						<li className='nav-item'>
							<NavHashLink smooth to={'/contact/#contactSectionContainer'} className='nav-link'>
								Contact
							</NavHashLink>
						</li>
					</ul>
				</div>
				<div id='iconSecond' className='d-flex  align-items-center justify-content-center'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='iconSize bi bi-bag-heart-fill mx-2 currentColor pointer'
						viewBox='0 0 16 16'
						data-cartbutton
						onClick={() => {
							toggleCart(user);
						}}>
						<path d='M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5ZM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1Zm0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z' />
					</svg>
					<div
						className='badge d-flex justify-content-center align-items-center p-2'
						style={{ height: '1.3rem', width: '1.3rem' }}>
						{cartArray?.length ?? 0}
					</div>
					<span className='line lineColor'></span>
					{user === null ? (
						<Link to='/login'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='iconSize bi bi-person-fill-add ms-2 currentColor pointer'
								viewBox='0 0 16 16'>
								<path d='M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
								<path d='M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z' />
							</svg>
						</Link>
					) : (
						<div className='d-flex align-items-center justify-content-center flex-column ms-3'>
							<img id='userIconTippy' src={userIcon} alt='' className=' iconSize' />
							<button className='fs-6 btn text-light font-lato  border-0 p-0'>
								<u
									style={{
										borderBottom: '1.3px solid white',
										filter: 'brightness(50%)'
									}}
									onClick={() => {
										logoutUser(dispatch);
										dispatch(setCartArray([]));
									}}>
									Logout
								</u>
							</button>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}

export default NavigationBar;
