export function formatNumber(number, decimal) {
	//Thousand separator and decimal places
	decimal = decimal === undefined ? 0 : decimal;

	return number.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export function formatNumberPlain(number, decimal) {
	//Decimal places and no thousand separator
	decimal = decimal === undefined ? 0 : decimal;

	return parseFloat(number.toFixed(decimal));
}
