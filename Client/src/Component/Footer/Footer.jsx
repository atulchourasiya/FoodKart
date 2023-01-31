import './Footer.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentMenuName, setMenuState } from '../../Redux/Slices/menuSlice';
import { NavHashLink } from 'react-router-hash-link';

const Footer = () => {
	const { CategoryArray } = useSelector((state) => state.categoryState);
	const dispatch = useDispatch();
	return (
		<>
			<section id='footerContainer' className=' row m-0 p-4 font-heebo'>
				<div className='col-4 text-center'>
					<p className='fs-5 fw-bold'>Address</p>
					<div className=''>
						C-39 Iind Floor,
						<br />
						Opposite Hotel Sangat Plaza <br /> Zone-1 M.P. Nagar, Bhopal - 462011
					</div>
				</div>
				<div className='col-4 align-items-center'>
					<div>
						<p className='fs-5 fw-bold'>Menu</p>
						<div className='d-flex w-100'>
							{CategoryArray?.map((item, index) => {
								return (
									<NavHashLink
										to={'/menu/#menuContainer'}
										className='categoryItem'
										onClick={(_) => {
											dispatch(setMenuState(item.category));
											dispatch(setCurrentMenuName(item.categoryName));
										}}
										key={`category${index}`}>
										{item.categoryName}
									</NavHashLink>
								);
							})}
						</div>
					</div>
				</div>
				<div className='col-4 text-center'>
					<div>
						<p className='fs-5 fw-bold'>Social Links</p>
						<ul className='d-flex p-0 mx-auto'>
							<li className='p-1'>
								<a
									target='_blank'
									rel='noopener'
									href='https://www.facebook.com/atul.chourasiya.756859'>
									<img width={24} src={`images/1675000182104-facebook.png`} alt='facebook' />
								</a>
							</li>
							<li className='p-1'>
								<a target='_blank' rel='noopener' href='https://www.instagram.com/atulchourasiyaa'>
									<img width={24} src={`images/1675000182105-insta.png`} alt='instagram' />
								</a>
							</li>
							<li className='p-1'>
								<a target='_blank' rel='noopener' href='https://twitter.com/AtulChourasiyaa'>
									<img width={24} src={`images/1675000182105-linkedin.png`} alt='twitter' />
								</a>
							</li>
							<li className='p-1'>
								<a target='_blank' rel='noopener' href='https://github.com/atulchourasiya/'>
									<img width={24} src={`images/1675000182105-github.png`} alt='github' />
								</a>
							</li>
							<li className='p-1'>
								<a
									target='_blank'
									rel='noopener'
									href='https://www.linkedin.com/in/atul-chourasiya-7414ba215/'>
									<img width={24} src={`images/1675000182105-linkedin.png`} alt='linkedin' />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</section>
			<div className=' footer d-flex justify-content-center align-items-center font-lato bg-dark text-light'>
				Designed & Developed By
				<a
					href='https://github.com/atulchourasiya/FoodKart'
					id='sign'
					rel='noopener'
					className={`d-flex justify-content-center align-items-center `}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 16 16'
						width={14}
						className='mx-2'
						fill='white'>
						<path
							fillRule='evenodd'
							d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'></path>
					</svg>
					Atul Chourasiya
				</a>
			</div>
		</>
	);
};

export default Footer;
