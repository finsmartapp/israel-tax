export function studyFundCalc(
	income,
	employment,
	amount,
	type,
	studyFundTaxAllowance,
	options,
	eoy
) {
	let eoyTotal = 0;

	if (eoy) {
		eoyTotal +=
			(studyFundTaxAllowance / options.length) *
			options.filter(option => option.match(/maximum/)).length;

		options.forEach((option, i) => {
			if (option === 'custom') {
				if (type[i] === 'shekel') {
					eoyTotal += amount[i];
				} else {
					eoyTotal += income[i] * (amount[i] / 100);
				}
			}
		});
	}

	const contribution = eoy ? eoyTotal : type === 'shekel' ? amount : income * (amount / 100);

	if (employment === 'employee') {
		return contribution;
	} else {
		return {
			studyFundContribution: contribution,
			studyFundTaxDeductible:
				contribution > studyFundTaxAllowance ? studyFundTaxAllowance : contribution
		};
	}
}
