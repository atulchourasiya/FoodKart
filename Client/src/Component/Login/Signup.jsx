import { useState } from 'react';
import { Link } from 'react-router-dom';
import dessert from '../../Assets/Category/dessert.jpg';
import logo from '../../Assets/Image/logo.png';
import { useRef } from 'react';
import { handleSignup, matchPassword, validateInput } from './signUpFunc';
import { useNavigate } from 'react-router-dom';
import { showPassword } from './loginFunc';

const Signup = () => {
	const email = useRef();
	const password = useRef();
	const confirmPassword = useRef();
	const name = useRef();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
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
										src={dessert}
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
												handleSignup(name, email, password, confirmPassword, setLoading, navigate);
											}}>
											<div className='d-flex align-items-center mb-3 pb-1'>
												<i className='fas fa-cubes fa-2x me-3' style={{ color: '#ff6219' }}></i>
												<img src={logo} alt='' height={32} />
											</div>

											<h5 className='fw-normal mb-3 pb-3' style={{ letterSpacing: '1px' }}>
												Register your account
											</h5>
											<div className='row'>
												<div className='form-outline mb-4 col-6 position-relative'>
													<input
														type='text'
														ref={name}
														onInput={(event) =>
															validateInput(event, /^(?=[ ]*[a-zA-Z]{2})[A-Za-z ]{2,15}$/)
														}
														className='form-control form-control-lg font-lato'
														placeholder='Name'
														required
														style={{ fontSize: 'var(--fs-400)' }}
													/>
													<div className='valid-feedback'>Looks good!</div>
													<div className='invalid-feedback'>
														Name must have 2-15 alphabet & spaces allowed.
													</div>
												</div>

												<div className='form-outline mb-4 col-6  position-relative'>
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

												<div className='form-outline mb-4 col-6  position-relative'>
													<input
														type='password'
														ref={password}
														placeholder='Password'
														onInput={(event) => {
															validateInput(event, /^(?=\S*[0-9])\S{6,20}$/);
															matchPassword(password, confirmPassword);
														}}
														className='d-inline align-middle form-control form-control-lg font-lato'
														required
														style={{ fontSize: 'var(--fs-400)', width: 'calc(100% - 2.6rem)' }}
													/>
													<span
														type='button'
														className='d-inline align-middle bg-light rounded'
														onClick={() => {
															showPassword(password);
														}}
														style={{ padding: '.8rem' }}>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															width='1rem'
															height='1rem'
															fill='currentColor'
															className='bi bi-eye-fill'
															viewBox='0 0 16 16'>
															<path d='M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z' />
															<path d='M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z' />
														</svg>
													</span>
													<div className='valid-feedback'>Looks good!</div>
													<div className='invalid-feedback'>
														Password must have 6-20 character with 1 digit.
													</div>
												</div>

												<div className='form-outline mb-4 col-6  position-relative'>
													<input
														type='password'
														ref={confirmPassword}
														onInput={() => {
															matchPassword(password, confirmPassword);
														}}
														placeholder='Repeat password'
														className='d-inline align-middle form-control form-control-lg font-lato'
														required
														style={{ fontSize: 'var(--fs-400)', width: 'calc(100% - 2.6rem)' }}
													/>
													<span
														type='button'
														className='d-inline align-middle bg-light rounded'
														onClick={() => {
															showPassword(confirmPassword);
														}}
														style={{ padding: '.8rem' }}>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															width='1rem'
															height='1rem'
															fill='currentColor'
															className='bi bi-eye-fill'
															viewBox='0 0 16 16'>
															<path d='M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z' />
															<path d='M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z' />
														</svg>
													</span>
													<div className='valid-feedback'>Looks good!</div>
													<div className='invalid-feedback'>
														Repeat password must have 6-20 character with 1 digit & match with
														password
													</div>
												</div>
											</div>

											<div className='pt-1 mb-4'>
												<button
													disabled={loading}
													className='btn btn-dark btn-lg btn-block'
													type='submit'>
													Sign up
												</button>
											</div>

											<Link className='small text-muted' to={'/resetpassword'}>
												Forgot password?
											</Link>
											<p className='mb-2 pb-lg-2' style={{ color: '#393f81' }}>
												Already have a account?
												<Link to='/login' style={{ color: '#393f81' }}>
													Login here
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

export default Signup;
