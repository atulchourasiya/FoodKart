import { resetPassword } from '../../Redux/Slices/authSlice';
import { showToast } from './loginFunc';

export const handleResetPassword = async (email, setLoading, navigate) => {
	if (!email.current.classList.contains('is-valid')) {
		showToast('warning', 'Please review the fields marked in red.');
		return;
	}
	try {
		setLoading(true);
		await resetPassword(email.current.value);
		showToast(
			'success',
			'A password reset link has sent to your email,you can set new password through link.'
		);

		setLoading(false);
		navigate('/login');
	} catch (error) {
		if (error.code === 'auth/user-not-found') {
			showToast('error', 'There is no user record corresponding to email.');
		} else {
			showToast('error', error.message);
		}
		setLoading(false);
	}
};
