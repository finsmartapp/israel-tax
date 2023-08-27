export function pensionReliefCalc(taxData, taxYearIndex, pensionContribution, income) {
	//Tax benefit is available as a percent of monthly contributions up to a fixed shekel limit

	const { taxCreditMaxPercent, taxCreditMaxShekel, taxCreditRate } =
		taxData[taxYearIndex].pension.taxRelief.employee;
	const shekelPercent = income * (taxCreditMaxPercent / 100);
	const ceiling = taxCreditMaxShekel > shekelPercent ? shekelPercent : taxCreditMaxShekel;

	let pensionTaxCredit;

	if (pensionContribution >= ceiling) {
		pensionTaxCredit = ceiling * (taxCreditRate / 100);
	} else {
		pensionTaxCredit = pensionContribution * (taxCreditRate / 100);
	}

	return pensionTaxCredit;
}
