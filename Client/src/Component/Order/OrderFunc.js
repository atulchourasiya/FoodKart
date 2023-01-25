import { isUserNull } from '../Contact/ContactFunc';
import { showToast } from '../Login/loginFunc';

export const handlePayment = async (
	user,
	subtotal,
	orderid,
	mobile,
	postalcode,
	houseno,
	address
) => {
	if (isUserNull(user)) {
		return;
	}
	if (
		!mobile.current.classList.contains('is-valid') ||
		!postalcode.current.classList.contains('is-valid') ||
		!houseno.current.classList.contains('is-valid') ||
		!address.current.classList.contains('is-valid')
	) {
		showToast('warning', 'Please review the fields marked in red.');
		return;
	}
	const data = {
		purpose: `Order Payment - ${orderid}`,
		amount: `${subtotal + Math.ceil(subtotal * 0.18)}`,
		buyer_name: user.name,
		email: user.email,
		phone: `${mobile.current.value}`,
		redirect_url: `http://localhost:5000/bid/callback?info=${encodeURIComponent(
			`user_id=${orderid}&postalcode=${postalcode.current.value}&houseno=${houseno.current.value}&address=${address.current.value}`
		)}`,
		webhook: 'https://eo6zelewtfo19l4.m.pipedream.net'
	};
	try {
		const response = await fetch(`${process.env.REACT_APP_API_HOST}/bid/pay`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		if (response.status === 200) {
			const res = await response.json();
			window.open(res.paymenturl, '_blank');
		}
	} catch (error) {
		console.error(error);
		showToast('error', 'Something went wrong');
	}
};
