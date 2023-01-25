import { auth } from '../../firebase';
import { logout, setUser } from '../../Redux/Slices/authSlice';
import { addUser } from '../../Redux/Slices/userSlice';
import { showToast } from './loginFunc';

let timerFunctionInterval = null;

export const checkIfVerified = (navigate, dispatch) => {
	if (document.hidden === false) {
		const Timeout = setTimeout(async (_) => {
			if (auth.currentUser !== null) {
				await auth.currentUser.reload();
				let isVerified = auth.currentUser.emailVerified;
				if (isVerified) {
					dispatch(
						setUser({
							name: auth.currentUser.displayName,
							email: auth.currentUser.email,
							emailVerified: isVerified
						})
					);
					dispatch(
						addUser({
							name: auth.currentUser.displayName,
							email: auth.currentUser.email
						})
					);
					clearTimer();
					navigate('/');
				}
			}
			clearTimeout(Timeout);
		}, 3000);
	}
};
export const resendVerificationLink = async (setLoading, setTimer) => {
	if (auth.currentUser !== null) {
		try {
			await auth.currentUser.sendEmailVerification();
			timerFunction(setLoading, setTimer);
			showToast('success', 'A verification link has sent to your email.');
		} catch (error) {
			showToast('error', error.message);
		}
	}
};

export const timerFunction = (setLoading, setTimer) => {
	let timer = 60;
	setTimer(60);
	setLoading(true);
	clearTimer();
	timerFunctionInterval = setInterval(() => {
		if (timer === 0) {
			clearTimer();
			setLoading(false);
		}
		timer--;
		setTimer(timer);
	}, 1000);
};

export const signOut = async (navigate) => {
	await logout();
	clearTimer();
	navigate('/');
};

const clearTimer = () => {
	if (timerFunctionInterval !== null) {
		clearInterval(timerFunctionInterval);
		timerFunctionInterval = null;
	}
};
