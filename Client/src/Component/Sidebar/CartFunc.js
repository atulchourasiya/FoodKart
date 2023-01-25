export const getSubTotal = (cartArray) => {
	let total = 0;
	cartArray.forEach((item) => {
		total += item.quantity * Number(item.price);
	});
	return total;
};
export const toggleOrderPage=()=>{
	let orderContainer = document.getElementById('orderSectionContainer');
	orderContainer.classList.toggle('orderOpen');
}