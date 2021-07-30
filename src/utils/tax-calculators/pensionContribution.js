export function pensionContributionCalc(income, legalMin, option, amount, type) {
	let contribution;

	if (option === 'legalMin') {
		contribution = legalMin;
	} else if (option === 'custom' && type === 'shekel') {
		contribution = amount;
	} else {
		contribution = income * (amount / 100);
	}
	return contribution;
}
