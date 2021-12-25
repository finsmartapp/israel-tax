export function pensionContributionCalc(income, legalMin, option, amount, type, eoy) {
	const monthTotal =
		option === 'legalMin'
			? legalMin
			: option === 'custom' && type === 'shekel'
			? amount
			: income * (amount / 100);
	let eoyTotal = 0;

	if (eoy) {
		eoyTotal += (legalMin / option.length) * option.filter(opt => opt.match(/legalMin/)).length;

		option.forEach((opt, i) => {
			if (opt === 'custom') {
				if (type[i] === 'shekel') {
					eoyTotal += amount[i];
				} else {
					eoyTotal += income[i] * (amount[i] / 100);
				}
			}
		});
	}

	return eoy ? eoyTotal : monthTotal;
}
