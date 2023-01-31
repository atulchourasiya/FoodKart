import emailjs from '@emailjs/browser';
import { addContact } from '../../Redux/Slices/contactSlice';
import { showToast } from '../Login/loginFunc';

export const handleContactFormSubmit = (
	user,
	form,
	name,
	email,
	message,
	dispatch,
	setLoading,
	navigate,
	LastContactDate
) => {
	if (isUserNull(user,navigate)) {
		return;
	}
	let dateAfterOneDay;
	if (LastContactDate === null) dateAfterOneDay = 0;
	else dateAfterOneDay = LastContactDate + 24 * 60 * 60 * 1000;
	let currentTime = new Date().getTime();
	if (currentTime < dateAfterOneDay) {
		showToast('warning', 'One message per day is the limit in beta version of application.');
		message.current.value = '';
		return;
	}
	setLoading(true);
	dispatch(
		addContact({
			name: name.current.value,
			user: email.current.value,
			message: message.current.value,
			date: Date.now()
		})
	);
	emailjs.sendForm(
		process.env.REACT_APP_SERVICE_ID,
		process.env.REACT_APP_TEMPLETE_ID,
		form.current,
		process.env.REACT_APP_PUBLIC_ID
	);
	message.current.value = '';
	setLoading(false);
};

export const isUserNull = (user,navigate = null) => {
	if (user === null) {
		showToast('warning', 'You need to login to unlock this feature.');
		if(navigate!==null)
		navigate('/login')
		return true;
	} else return false;
};
