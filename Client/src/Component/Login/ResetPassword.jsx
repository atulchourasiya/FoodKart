import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { validateInput } from './signUpFunc';
import { handleResetPassword } from './ResetPasswordFunc';

const ResetPassword = () => {
	const email = useRef();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	return (
		<section
			className='vh-100 position-relative'
			style={{
				background: 'linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))'
			}}>
			<div
				className='position-absolute top-0 left-0 pointer p-3'
				onClick={() => {
					navigate('/');
				}}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='2rem'
					height='2rem'
					className='bi bi-arrow-left-short'
					fill='white'
					viewBox='0 0 16 16'>
					<path
						fillRule='evenodd'
						d='M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z'
					/>
					<path
						fillRule='evenodd'
						d='M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z'
					/>
				</svg>
			</div>
			<div className='container h-100'>
				<div
					className='row d-flex justify-content-center position-relative top-50'
					style={{ transform: 'translateY(-50%)' }}>
					<div className='col col-xl-10'>
						<div className='card' style={{ borderRadius: '1rem' }}>
							<div className='row g-0'>
								<div className='col-md-6 col-lg-5 d-none d-md-block'>
									<img
										src={`images/1674222401843-dessert.jpg`}
										alt='login form'
										className='img-fluid h-100'
										style={{ borderRadius: '1rem 0 0 1rem' }}
									/>
								</div>
								<div className='col-md-6 col-lg-7 d-flex align-items-center'>
									<div className='card-body px-4 text-black'>
										<form
											onSubmit={(event) => {
												event.preventDefault();
												handleResetPassword(email, setLoading, navigate);
											}}>
											<div className='d-flex align-items-center mb-3 pb-1'>
												<i className='fas fa-cubes fa-2x me-3' style={{ color: '#ff6219' }}></i>
												<img src={`images/1675195335425-logo.png`} alt='' height={32} />
											</div>

											<h5 className='fw-normal mb-3 pb-3' style={{ letterSpacing: '1px' }}>
												Reset Password
											</h5>

											<div className='form-outline mb-4 position-relative'>
												<input
													type='email'
													ref={email}
													onInput={(event) =>
														validateInput(
															event,
															/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
														)
													}
													placeholder='E-mail'
													className='form-control form-control-lg font-lato'
													required
													style={{ fontSize: 'var(--fs-400)' }}
												/>
												<div className='valid-feedback'>Looks good!</div>
												<div className='invalid-feedback'>
													Email address must be in proper format. e.g yourmail@gmail.com
												</div>
											</div>

											<div className='pt-1 mb-4'>
												<button
													disabled={loading}
													className='btn btn-dark btn-lg btn-block'
													type='submit'>
													Reset
												</button>
											</div>
											<p className='mb-2 pb-lg-2' style={{ color: '#393f81' }}>
												Already have a account?
												<Link to='/login' style={{ color: '#393f81' }}>
													Login here
												</Link>
											</p>
											<p className='mb-2 pb-lg-2' style={{ color: '#393f81' }}>
												Don't have a account?
												<Link to={'/signup'} style={{ color: '#393f81' }}>
													Register here
												</Link>
											</p>
										</form>
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

export default ResetPassword;
