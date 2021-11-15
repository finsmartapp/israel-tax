export function pensionReliefCalc(taxData, taxYearIndex, pensionContribution, income) {
	//Tax benefit is available as a percent of monthly contributions up to a fixed shekel limit

	const { percentLimit, shekelLimit, taxCreditRate } =
		taxData[taxYearIndex].pension.taxRelief.employee;
	const shekelPercent = income * (percentLimit / 100);
	const ceiling = shekelLimit > shekelPercent ? shekelPercent : shekelLimit;

	let pensionTaxCredit;

	if (pensionContribution >= ceiling) {
		pensionTaxCredit = ceiling * (taxCreditRate / 100);
	} else {
		pensionTaxCredit = pensionContribution * (taxCreditRate / 100);
	}

	return pensionTaxCredit;
}
