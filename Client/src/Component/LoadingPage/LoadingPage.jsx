import RiseLoader from 'react-spinners/RiseLoader';
import { useState, useEffect } from 'react';
import { fetchMenu } from '../../Redux/Slices/menuSlice';
import { setInitialLoading } from '../../Redux/Slices/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../../Redux/Slices/categorySlice';

const LoadingPage = () => {
	const [size, setSize] = useState(10);
	const dispatch = useDispatch();
	const { MenuArray } = useSelector((state) => state.menuState);
	const { CategoryArray } = useSelector((state) => state.categoryState);
	const calculateSize = () => {
		const element = document.getElementById('loadingpageimg');
		if (element) {
			let size = window.getComputedStyle(element).width;
			setSize(parseInt(size, 10) / 10);
			return;
		}
		setSize(15);
	};
	useEffect(() => {
		if (MenuArray !== null && CategoryArray !== null) {
			dispatch(setInitialLoading(false));
		}
	}, [MenuArray, CategoryArray]);
	useEffect(() => {
		calculateSize();
		window.addEventListener('resize', calculateSize);
		dispatch(fetchMenu());
		dispatch(fetchCategory());
		return () => {
			window.removeEventListener('resize', calculateSize);
		};
	}, []);
	return (
		<div
			className='vh-100 bg-light flex-column d-flex align-items-center justify-content-center'
			style={{ zIndex: '5000' }}>
			<img
				src='/android-chrome-512x512.png'
				id='loadingpageimg'
				className='mb-5'
				style={{ width: '10rem', height: '10rem' }}></img>
			<RiseLoader size={size} color='orange' />
		</div>
	);
};

export default LoadingPage;
