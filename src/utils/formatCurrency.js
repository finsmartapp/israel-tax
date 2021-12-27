export function formatCurrency(country, number, decimal) {
	// decimal !== ??
	if (country === 'il') {
		var language = 'en-IL';
		var currency = 'ILS';
	}
	return new Intl.NumberFormat(language, {
		style: 'currency',
		currency: currency,
		maximumFractionDigits: decimal
	}).format(number);
}
