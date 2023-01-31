import RiseLoader from 'react-spinners/RiseLoader';
import { useState, useEffect } from 'react';
import { fetchMenu } from '../../Redux/Slices/menuSlice';
import { setInitialLoading } from '../../Redux/Slices/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../../Redux/Slices/categorySlice';
import { fetchTestimonial } from '../../Redux/Slices/testimonialSlice';
import { fetchService } from '../../Redux/Slices/serviceSlice';
import { check } from '../../Redux/Slices/userSlice';

const LoadingPage = () => {
	const [size, setSize] = useState(10);
	const dispatch = useDispatch();
	const { MenuArray } = useSelector((state) => state.menuState);
	const { CategoryArray } = useSelector((state) => state.categoryState);
	const { TestimonialArray } = useSelector((state) => state.testimonialState);
	const { ServiceArray } = useSelector((state) => state.serviceState);
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
		if (MenuArray !== null && CategoryArray !== null && TestimonialArray !== null) {
			dispatch(setInitialLoading(false));
		}
	}, [MenuArray, CategoryArray, TestimonialArray, ServiceArray]);
	useEffect(() => {
		dispatch(check());
		calculateSize();
		window.addEventListener('resize', calculateSize);
		dispatch(fetchMenu());
		dispatch(fetchService());
		dispatch(fetchCategory());
		dispatch(fetchTestimonial());
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
