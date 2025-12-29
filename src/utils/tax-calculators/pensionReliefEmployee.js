import pensionTables from '../../data/pension.json';
export function pensionReliefCalc(taxYearIndex, pensionContribution, income) {
	//Tax benefit is available as a percent of monthly contributions up to a fixed shekel limit

	const { taxCreditMaxPercent, taxCreditMaxShekel, taxCreditRate } =
		pensionTables[taxYearIndex].taxRelief.employee;
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
