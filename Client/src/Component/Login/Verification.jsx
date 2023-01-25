import { useNavigate } from 'react-router-dom';
import dessert from '../../Assets/Category/dessert.jpg';
import {
	checkIfVerified,
	resendVerificationLink,
	signOut,
	timerFunction
} from './verificationFunc';
import { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import BeatLoader from 'react-spinners/BeatLoader';
import { useDispatch } from 'react-redux';
import logo from '../../Assets/Image/logo.png';
import { setCartArray } from '../../Redux/Slices/cartSlice';

const Verification = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [timer, setTimer] = useState(60);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user === null || user?.emailVerified) {
				navigate('/');
			} else timerFunction(setLoading, setTimer);
		});
		document.addEventListener('visibilitychange', handleVisiblityChange);
		return () => {
			document.removeEventListener('visibilitychange', handleVisiblityChange);
			unsubscribe();
		};
	}, []);
	const handleVisiblityChange = checkIfVerified.bind(this, navigate, dispatch);
	return (
		<section
			className='vh-100'
			style={{
				background: 'linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))'
			}}>
			<div className='container h-100 '>
				<div
					className='row d-flex justify-content-center position-relative top-50'
					style={{ transform: 'translateY(-50%)' }}>
					<div className='col col-xl-10'>
						<div className='card' style={{ borderRadius: '1rem' }}>
							<div className='row g-0'>
								<div className='col-md-6 col-lg-5 d-none d-md-block'>
									<img
										src={dessert}
										alt='login form'
										className='img-fluid h-100'
										style={{ borderRadius: '1rem 0 0 1rem' }}
									/>
								</div>
								<div className='col-md-6 col-lg-7 d-flex align-items-center'>
									<div className='card-body px-4 text-black'>
										<div className='d-flex align-items-center mb-3 pb-1'>
											<i className='fas fa-cubes fa-2x me-3' style={{ color: '#ff6219' }}></i>
											<img src={logo} alt='' height={32} />
										</div>

										<h5 className='fw-normal mb-3 pb-3 font-lato' style={{ letterSpacing: '1px' }}>
											Verify your email through verification link to activate the account.
										</h5>
										<div className='mb-3 fs-6 pb-3 fw-bolder font-lato'>
											<BeatLoader color='#36d7b7' size={'1rem'} />
											Checking verification
										</div>
										<div className='d-flex pt-1 mb-4'>
											<button
												className='btn btn-dark btn-lg btn-block me-2'
												type='button'
												disabled={loading}
												onClick={() => {
													resendVerificationLink(setLoading, setTimer);
												}}>
												Resend Email {loading === true ? `${timer}s` : ''}
											</button>
											<button
												className='btn btn-dark btn-lg btn-block'
												type='button'
												onClick={() => {
													signOut(navigate);
													dispatch(setCartArray([]));
												}}>
												Sign out
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Verification;
