import Heading from '../Heading/Heading';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import './Menu.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentMenuName, setMenuState } from '../../Redux/Slices/menuSlice';
import BeatLoader from 'react-spinners/BeatLoader';
import MenuCard from '../Card/MenuCard';

const Menu = () => {
	const { currentMenu, currentMenuName, highlightMenu, MenuArray } = useSelector(
		(state) => state.menuState
	);
	const { CategoryArray } = useSelector((state) => state.categoryState);
	const dispatch = useDispatch();
	const handleClick = (event) => {
		if (event.target.classList.contains('menuCategoryText')) {
			CategoryArray.every((item) => {
				if (item.categoryName === event.target.innerText) {
					dispatch(setMenuState(item.category));
					dispatch(setCurrentMenuName(item.categoryName));
					return false;
				}
				return true;
			});
		}
	};
	return (
		<section id='menuContainer' className='p-4'>
			<div className='pt-4'>
				<Heading subheading='Menu' heading={`Lets Explore ${currentMenuName} `} position='center' />
				<div className='px-lg-5 px-4 py-2' onClick={handleClick}>
					<Splide
						aria-label='My Favorite Images'
						aria-hidden='false'
						options={{
							type: 'loop',
							drag: 'free',
							focus: 'center',
							gap: '1rem',
							perMove: 1,
							arrows: true,
							autoWidth: true,
							rewindByDrag: 'true',
							pagination: false
						}}>
						{CategoryArray.map((item, index) => {
							return (
								<SplideSlide key={`SplideSlide${index}`}>
									<div className={`menuCategoryText font-heebo mx-3 fw-bold`}>
										{item.categoryName}
									</div>
								</SplideSlide>
							);
						})}
					</Splide>
				</div>
				<div className='d-flex justify-content-center align-items-center flex-wrap p-4'>
					{MenuArray !== null ? (
						MenuArray.length !== 0 ? (
							MenuArray.map((item, index) => {
								if (item.category !== currentMenu) {
									return '';
								}
								return (
									<MenuCard
										key={`menu${index}`}
										name={item.name}
										description={item.description}
										productid={item.productid}
										img={item.img}
										price={item.price}
										highlight={
											highlightMenu !== false && highlightMenu === item.name ? true : false
										}
									/>
								);
							})
						) : (
							<div className='d-flex align-items-center flex-column justify-content-center h-100'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='6rem'
									height='6rem'
									fill='#8686869f'
									className='bi bi-inbox-fill'
									viewBox='0 0 16 16'>
									<path d='M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm-1.17-.437A1.5 1.5 0 0 1 4.98 3h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z' />
								</svg>
							</div>
						)
					) : (
						<BeatLoader size={'1rem'} color='#8686869f' />
					)}
				</div>
			</div>
		</section>
	);
};
export default Menu;
