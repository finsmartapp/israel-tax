export function pensionContributionCalc(type, income, min, percent) {
	let contribution;
	if (type === 'legalMin') {
		contribution = min;
	} else {
		contribution = income * (percent / 100);
	}
	return contribution;
}
