export function formatCurrency(country, number) {
	if (country === 'il') {
		var language = 'he-IL';
		var currency = 'ILS';
	}
	return new Intl.NumberFormat(language, { style: 'currency', currency: currency }).format(number);
}
