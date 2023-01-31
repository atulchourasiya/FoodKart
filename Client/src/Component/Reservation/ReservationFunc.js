import { addReservation, setReservationLoading } from '../../Redux/Slices/reservation';
import { isUserNull } from '../Contact/ContactFunc';
import { showToast } from '../Login/loginFunc';

export const minDate = () => {
	let today = new Date();
	let month = today.getMonth() + 1;
	let date = today.getDate();
	let year = today.getFullYear();
	if (month < 10) {
		month = `0${month}`;
	}
	if (date < 10) {
		date = `0${date}`;
	}
	today = `${year}-${month}-${date}`;
	return today;
};

export const maxDate = () => {
	let today = new Date();
	let month = today.getMonth() + 1;
	let date = today.getDate();
	let year = today.getFullYear();
	if (month === 12) {
		year = year + 1;
	} else {
		month = month + 1;
	}
	if (month < 10) {
		month = `0${month}`;
	}
	if (date < 10) {
		date = `0${date}`;
	}
	today = `${year}-${month}-${date}`;
	return today;
};

export const handleReservationFormSubmit = async (
	user,
	firstname,
	lastname,
	mobile,
	seat,
	date,
	time,
	request,
	dispatch,
	navigate
) => {
	if (isUserNull(user,navigate)) {
		return;
	}
	if (
		!firstname.current.classList.contains('is-valid') ||
		!lastname.current.classList.contains('is-valid') ||
		!mobile.current.classList.contains('is-valid') ||
		!seat.current.classList.contains('is-valid') ||
		!date.current.classList.contains('is-valid') ||
		!time.current.classList.contains('is-valid')
	) {
		showToast('warning', 'Please review the fields marked in red.');
		return;
	}
	dispatch(
		addReservation({
			user: user.email,
			firstname: firstname.current.value,
			lastname: lastname.current.value,
			date: date.current.value,
			time: time.current.value,
			seat: seat.current.value,
			request: request.current.value,
			mobile: mobile.current.value
		})
	);
	dispatch(setReservationLoading(true));
	firstname.current.value = '';
	lastname.current.value = '';
	date.current.value = '';
	time.current.value = '';
	seat.current.value = '';
	request.current.value = '';
	mobile.current.value = '';
	removeValidation(firstname);
	removeValidation(lastname);
	removeValidation(mobile);
	removeValidation(seat);
	removeValidation(date);
	removeValidation(time);
	removeValidation(request);
};

export const removeValidation = (element) => {
	element.current.classList.remove('is-invalid');
	element.current.classList.remove('is-valid');
};
