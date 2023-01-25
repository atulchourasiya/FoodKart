import { Splide, SplideSlide } from '@splidejs/react-splide';
import CategoryCard from '../Card/CategoryCard';
import Heading from '../Heading/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentMenuName, setMenuState } from '../../Redux/Slices/menuSlice';

const Category = () => {
	const dispatch = useDispatch();
	const { CategoryArray } = useSelector((state) => state.categoryState);
	const handleClick = (event) => {
		const clickedDiv = event.target.closest('.categoryCard');
		if (clickedDiv) {
			const text = clickedDiv.getElementsByClassName('card-title')[0].innerText;
			CategoryArray.every((item) => {
				if (item.categoryName === text) {
					dispatch(setMenuState(item.category));
					dispatch(setCurrentMenuName(item.categoryName));
					return false;
				}
				return true;
			});
		}
	};
	return (
		<section className='p-4'>
			<Heading subheading='Top Category' heading='More Than 1000+ Variety' />
			<div onClick={handleClick}>
				<Splide
					aria-label='My Favorite Images'
					options={{
						type: 'loop',
						drag: 'free',
						focus: 'center',
						gap: '1rem',
						perMove: 1,
						autoWidth: true,
						rewindByDrag: 'true',
						pagination: false
					}}>
					{CategoryArray.map((item, index) => {
						return (
							<SplideSlide key={`SplideSlide${index}`}>
								<CategoryCard
									name={item.categoryName}
									img={item.img}
									category={`${item.category}`}
								/>
							</SplideSlide>
						);
					})}
				</Splide>
			</div>
		</section>
	);
};

export default Category;
