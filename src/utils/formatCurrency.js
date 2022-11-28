export function formatCurrency(country, number, decimal) {
	const decimalPoint = decimal === undefined ? 2 : decimal;

	if (country === 'il') {
		var language = 'en-IL';
		var currency = 'ILS';
	}
	return new Intl.NumberFormat(language, {
		style: 'currency',
		currency: currency,
		maximumFractionDigits: decimalPoint
	}).format(number);
}
