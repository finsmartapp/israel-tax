export function pensionReliefCalc(taxData, taxYearIndex, pensionContribution, income) {
	//Tax benefit is available as a percent of monthly contributions up to a fixed shekel limit

	const { percent, shekel, taxCreditRate } = taxData[taxYearIndex].pension.taxRelief.employee;
	const shekelPercent = income * (percent / 100);
	const ceiling = shekel > shekelPercent ? shekelPercent : shekel;

	let pensionTaxCredit;

	if (pensionContribution >= ceiling) {
		pensionTaxCredit = ceiling * (taxCreditRate / 100);
	} else {
		pensionTaxCredit = pensionContribution * (taxCreditRate / 100);
	}

	return pensionTaxCredit;
}
