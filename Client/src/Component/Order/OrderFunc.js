export const checkIfValid = (mobile, postalcode, houseno, address) => {
	if (
		!mobile.current.classList.contains('is-valid') ||
		!postalcode.current.classList.contains('is-valid') ||
		!houseno.current.classList.contains('is-valid') ||
		!address.current.classList.contains('is-valid')
	) {
		return false;
	}
	return true;
};
