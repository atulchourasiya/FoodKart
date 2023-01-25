import { toast } from 'react-toastify';
import { login, setUser } from '../../Redux/Slices/authSlice';

export const handleLogin = async (
	email,
	password,
	setLoading,
	navigate,
	dispatch,
	setRetry,
	setTimer
) => {
	if (
		!email.current.classList.contains('is-valid') ||
		!password.current.classList.contains('is-valid')
	) {
		showToast('warning', 'Please review the fields marked in red.');
		return;
	}
	try {
		setLoading(true);
		let userCredential = await login(email.current.value, password.current.value);
		if (userCredential.user.emailVerified) {
			dispatch(
				setUser({
					name: userCredential.user.displayName,
					email: userCredential.user.email,
					emailVerified: userCredential.user.emailVerified
				})
			);
			showToast('success', 'Login Successfully.');
			setLoading(false);
			navigate('/');
		} else {
			await userCredential.user.sendEmailVerification();
			showToast('success', 'A verification link has sent to your email.');
			setLoading(false);
			navigate('/verification');
		}
	} catch (error) {
		if (error.code === 'auth/wrong-password') {
			showToast('error', 'The password is invalid or user not available.');
		} else if (error.code === 'auth/too-many-requests') {
			loginTimerFunction(setRetry, setTimer);
			showToast(
				'error',
				'Too many request from this device hold on for a minute before try again.'
			);
		} else {
			showToast('error', error.message);
		}
	}
	setLoading(false);
};
export const loginTimerFunction = (setLoading, setTimer) => {
	let timer = 60;
	setLoading(true);
	let timerInterval = setInterval(() => {
		if (timer === 0) {
			setLoading(false);
			clearInterval(timerInterval);
		}
		setTimer(timer);
		timer--;
	}, 1000);
};
export const showPassword = (ref) => {
	ref.current.setAttribute('type', 'text');
	setTimeout(() => {
		ref.current.setAttribute('type', 'password');
	}, 500);
};

export const showToast = (state, payload) => {
	const option = {
		position: 'top-center',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'light'
	};
	if (state === 'success') {
		toast.success(payload, option);
	} else if (state === 'warning') {
		toast.warning(payload, option);
	} else if (state === 'info') {
		toast.info(payload, option);
	} else if (state === 'error') {
		toast.error(payload, option);
	} else {
		toast(payload, option);
	}
};
