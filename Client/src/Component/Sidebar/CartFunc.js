export const getSubTotal = (cartArray) => {
	let total = 0;
	cartArray.forEach((item) => {
		total += item.quantity * Number(item.price);
	});
	return total;
};
// export const clearOrderPage = () => {
// 	let mobileField = document.getElementById('mobileField');
// 	let postalField = document.getElementById('postalField');
// 	let housenoField = document.getElementById('housenoField');
// 	let addressField = document.getElementById('addressField');
// 	mobileField.value = '';
// 	postalField.value = '';
// 	housenoField.value = '';
// 	addressField.value = '';
// 	mobileField.classList.remove('is-valid');
// 	mobileField.classList.remove('is-invalid');
// 	postalField.classList.remove('is-valid');
// 	postalField.classList.remove('is-invalid');
// 	housenoField.classList.remove('is-valid');
// 	housenoField.classList.remove('is-invalid');
// 	addressField.classList.remove('is-valid');
// 	addressField.classList.remove('is-invalid');
// };

export const openCloseOrderPage = () => {
	let orderContainer = document.getElementById('orderSectionContainer');
	orderContainer.classList.toggle('orderOpen');
};
