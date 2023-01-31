import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { HashLink, NavHashLink } from 'react-router-hash-link';
import { highlightNavlink, toggleSidebar } from '../Navbar/NavbarFunc';
import './Sidebar.css';
const Sidebar = () => {
	const about = useRef();
	const service = useRef();
	const highlightFunc = highlightNavlink.bind(this, about, service);
	const location =useLocation();
	useEffect(() => {
		highlightFunc();
	}, [location]);
	useEffect(() => {
		document.addEventListener('click', (event) => {
			if (event.target.closest('[data-sidebarbutton]')) return;
			if (event.target.closest('#sidebarSectionContainer') === null) {
				document.getElementById('sidebarSectionContainer')?.classList.remove('sidebarOpen');
			}
		});
		document.addEventListener('scroll', highlightFunc);
		return () => {
			document.removeEventListener('scroll', highlightFunc);
		};
	}, []);
	return (
		<div id='sidebarSectionContainer' className='rounded bg-light'>
			<div className='d-flex justify-content-between mb-3'>
				<img src={`images/1675195335425-logo.png`} alt='' height={24} />
				<button
					type='button'
					data-sidebarbutton
					onClick={toggleSidebar}
					className='btn-close'
					aria-label='Close'></button>
			</div>
			<ul className='navbar-nav ms-auto me-auto mb-2 mb-lg-0 font-lato fs-4 fw-bold'>
				<li className='nav-item'>
					<NavHashLink to={'/#'} exact='true' className='nav-link hover' aria-current='page'>
						Home
					</NavHashLink>
					<HashLink
						to={'/#aboutSectionContainer'}
						ref={about}
						exact='true'
						className='ms-4 nav-link hover'
						aria-current='page'>
						About
					</HashLink>
					<HashLink
						to={'/#serviceSectionContainer'}
						ref={service}
						exact='true'
						className='ms-4 nav-link hover'
						aria-current='page'>
						Service
					</HashLink>
					<hr />
				</li>
				<li className='nav-item'>
					<NavHashLink id='menuNavigation' className='nav-link hover' to={'/menu/#menuContainer'}>
						Menu
					</NavHashLink>
					<hr />
				</li>
				<li className='nav-item'>
					<NavHashLink smooth to={'/gallery/#gallerySectionContainer'} className='nav-link'>
						Gallery
					</NavHashLink>
					<hr />
				</li>
				<li className='nav-item'>
					<NavHashLink smooth to={'/contact/#contactSectionContainer'} className='nav-link'>
						Contact
					</NavHashLink>
					<hr />
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
