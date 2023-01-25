import { createUser } from '../../Redux/Slices/authSlice';
import { showToast } from './loginFunc';

export const handleSignup = async (
	name,
	email,
	password,
	confirmPassword,
	setLoading,
	navigate
) => {
	if (
		!name.current.classList.contains('is-valid') ||
		!email.current.classList.contains('is-valid') ||
		!password.current.classList.contains('is-valid') ||
		!confirmPassword.current.classList.contains('is-valid')
	) {
		showToast('warning', 'Please review the fields marked in red.');
		return;
	}
	try {
		if (password.current.value === confirmPassword.current.value) {
			setLoading(true);
			const userCredential = await createUser(email.current.value, password.current.value);
			await userCredential.user.updateProfile({
				displayName: name.current.value
			});
			await userCredential.user.sendEmailVerification();
			showToast(
				'success',
				'Account created successfully, a verification link has sent to your email to activate the account.'
			);
			setLoading(false);
			navigate('/verification');
		}
	} catch (error) {
		if (error.code === 'auth/email-already-in-use') {
			showToast('error', 'The email address is already in use by another account.');
		} else {
			showToast('error', error.message);
		}
		setLoading(false);
	}
};

export const validateInput = (event, regex) => {
	if (event.target.value === '') {
		event.target.classList.remove('is-invalid');
		event.target.classList.remove('is-valid');
		return;
	}
	if (regex.test(event.target.value)) {
		event.target.classList.remove('is-invalid');
		event.target.classList.add('is-valid');
	} else {
		event.target.classList.remove('is-valid');
		event.target.classList.add('is-invalid');
	}
};

export const matchPassword = (password, confirmPassword) => {
	if (
		password.current.value === confirmPassword.current.value &&
		password.current.value.length > 5 &&
		confirmPassword.current.value.length > 0
	) {
		confirmPassword.current.classList.add('is-valid');
		confirmPassword.current.classList.remove('is-invalid');
	} else if (confirmPassword.current.value.length > 0) {
		confirmPassword.current.classList.remove('is-valid');
		confirmPassword.current.classList.add('is-invalid');
	} else if (confirmPassword.current.value.length === 0) {
		confirmPassword.current.classList.remove('is-valid');
		confirmPassword.current.classList.remove('is-invalid');
	}
};
