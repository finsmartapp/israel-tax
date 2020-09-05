export function formatNumber(number, decimal) {
	decimal = typeof decimal === 'undefined' ? 0 : decimal;

	return number.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
